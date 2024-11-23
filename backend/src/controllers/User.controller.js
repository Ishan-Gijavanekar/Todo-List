import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"


const generateTokens = async(userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        console.log("Success")
    
        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(401, "Something went wronge when generating access and refresh tokens")
    }
}


const registerUser = asyncHandler(async (req, res) => {
    const {username, email, password, address} = req.body

    if(!username || !email || !password || !address) {
        throw new ApiError(401, "All feilds are required")
    }

    const userExists = await User.findOne({
        $or : [{email}, {password}]
    })

    if(userExists) {
        throw new ApiError(401, "User Already exixts")
    }

    const user = await User.create({
        username,
        email,
        password,
        address
    })

    await user.save()

    const createdUser = await User.findById(user?._id).select("-password")

    return res
    .status(200)
    .json(
        new ApiResponse(200, createdUser, "User Registered successfully")
    )
})

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if(!email || !password) {
        throw new ApiError(401, "All feilds are required")
    }

    const user = await User.findOne({email})
    //console.log(user)

    if(!user) {
        throw new ApiError(401, "User does not exist")
    }

    const validatePassword = await user.isPasswordCorrect(password)

    if(!validatePassword) {
        throw new ApiError(401, "Invalid Credentials")
    }

    console.log(user._id);

    const {accessToken, refreshToken} = await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    //localStorage.setItem("accessToken", `Bearer ${accessToken}`);

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(200, {loggedInUser, accessToken, refreshToken}, "Logged in Successfully")
    )
})



export {registerUser, login}