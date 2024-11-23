import {asyncHandler} from "../utils/AsyncHandler.js"
import { User } from "../models/User.model.js"
import jwt from "jsonwebtoken"
import { accessSecreteKey } from "../models/User.model.js"
import {ApiError} from "../utils/ApiError.js"

const verifyJWT = asyncHandler(async (req, res, next) => {
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
     console.log(token)
 
     if(!token) {
         throw new ApiError(401, "Unauthorized Access")
     }
 
     const decodedToken = jwt.verify(token, accessSecreteKey)
 
     const user = await User.findById(decodedToken?._id).select("-password")
 
     if(!user) {
         throw new ApiError(401, "Invalid Access Token")
     }
 
     req.user = user
     next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Accesss token")
   }
})

export {verifyJWT}