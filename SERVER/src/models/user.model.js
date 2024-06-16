import mongoose, { Schema } from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';

const userschema = new Schema(
    {
        googleId: {
            type:String
        },
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        avatar: {
            type: String,   //cloudinary url
            required: true,
        },
        password: {
            type: String,
        },
        refreshtoken: {
            type: String
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        verifyToken: {
            type: String
        },
        isVerified: {
            type: Boolean,
            default: false
        },
        forgotPasswordToken: {
            type: String
        },
        forgotPasswordExpiry: {
            type: Date
        }
    },
    {
        timestamps: true
    }

)

userschema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userschema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userschema.methods.generateAccessToken = function (){
    return jwt.sign({
        _id:this._id,
        email: this.email,
        username: this.username
    },
    "OTUCdjhudisEL&yesejhfuesfh_gsjfsejhfrusfnASSS8ifd",
    { expiresIn: '24h' }
    )
}
userschema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}

export const User = mongoose.model("User", userschema)
