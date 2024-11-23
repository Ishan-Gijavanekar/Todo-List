import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcryptjs from 'bcryptjs'

const accessSecreteKey = 'hbcujbcjxbjcnklc41654531cxuscusbsjcbkjsabcj';
const accessTokenExpiry = "1d";
const refreshSecreteKey = 'cbdjsbchsvbkcbslhncidcd4c6d435cv1dvcndjnjc';
const refreshTokenExpiry = "10d";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true,
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) {
        return next()
    }
    this.password = await bcryptjs.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcryptjs.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        accessSecreteKey,
        {
            expiresIn: accessTokenExpiry
        }
    )
};


userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        refreshSecreteKey,
        {
            expiresIn: refreshTokenExpiry
        }
    )
};

const User = mongoose.model("User", userSchema);

export {User}
export { accessSecreteKey, refreshSecreteKey}