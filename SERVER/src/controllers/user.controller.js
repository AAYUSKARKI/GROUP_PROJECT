import { asynchandler } from "../utils/asynchandler.js";
import { Apierror } from "../utils/apierror.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Apiresponse } from "../utils/apiresponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accesstoken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()

        user.refreshtoken = refreshtoken
        await user.save({ validateBeforeSave: false })

        return { accesstoken, refreshtoken }
    } catch (error) {
        throw new Apierror(500, "something wwnt wrong while genrating refresh anf aveessstoken")
    }
}






const registerUser = asynchandler(async (req, res) => {
    //get user details from frontend
    //validation - not empty
    //check if user already exist :username,email
    //check for image,avatar
    //upload on cloudinary
    //create user object - create entry in db
    //remove password and refresh tokenfield from response
    //check for user creation 
    //return res
    const { email, username, password } = req.body
    console.log("email:", email);

    if ([ email, username, password].some((field) => field?.trim() === "")) {
        throw new Apierror(400, "All fields are required")
    }

    const existeduser = await User.findOne({
        $or: [
            { username }, { email }
        ]
    })

    if (existeduser) { throw new Apierror(409, "User with Email or Username already exist") }

    const avatarlocalpath = req.files?.avatar[0]?.path
    console.log("Avatar file received:", req.files?.avatar);
    if (!avatarlocalpath) {
        throw new Apierror(400, "Avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarlocalpath)
    if (!avatar) {
        throw new Apierror(400, "Avatar file not uploaded")
    }
    const user = await User.create({
        avatar: avatar.url,
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshtoken")

    if (!createdUser) {
        throw new Apierror(500, "something went wrong while registering a user")
    }

    return res.status(201).json(
        new Apiresponse(200, createdUser, "User Registered sucesfully")
    )
})

const loginuser = asynchandler(async (req, res) => {
    // Log the req.body object to inspect the data being sent from the client
    // console.log('Request Body:', req.body);
    // console.log('Request Object:', req);


    //req body bata data lera aaune
    //username or email
    //find the user
    //password check 
    //access and refreshtoken
    //send cookies
    //succesfully login
    const { email, username, password } = req.body
    // console.log("username ", username);
    // console.log("email ", email);
    // console.log('Request headers:', req.headers);
    if (!username && !email) {
        throw new Apierror(400, "username or email is required")

    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new Apierror(404, "user doesnt exist")
    }

    const isPasswordValid = await user.isPasswordCorrect(password)

    if (!isPasswordValid) {
        throw new Apierror(404, "user password wrong")
    }


    const { accesstoken, refreshtoken } = await generateAccessAndRefreshToken(user._id)

    const loggedinUser = await User.findById(user._id).select("-password,-refreshtoken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).cookie("accesstoken", accesstoken, options)
        .cookie("refreshtoken", refreshtoken, options)
        .json(
            new Apiresponse(
                200,
                {
                    user: loggedinUser, accesstoken, refreshtoken
                },
                "Userlogged in successfully"
            )
        )
})


const logoutuser = asynchandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshtoken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200).clearCookie("accesstoken", options).clearCookie("refreshtoken", options).json(new Apiresponse(200, {}, "user logout"))
})


const refreshaccesstoken = asynchandler(async (req, res) => {
    const incomingRefreshToken = req.cookies.refreshtoken || req.body.refreshtoken

    if (!incomingRefreshToken) {
        throw new Apierror(401, "unauthorized access")
    }

    try {
        const decodedtoken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedtoken?._id)
        if (!user) {
            throw new Apierror(401, "Invalid refresh token")
        }


        if (incomingRefreshToken !== user?.refreshtoken) {
            throw new Apierror(401, "Refres token is used or expire")
        }

        const options = {
            httpOnly: true,
            secure: true
        }

        const { accesstoken, Newrefreshtoken } = await generateAccessAndRefreshToken(user._id)

        return res.status(200).cookie("accestoken", accesstoken, options)
            .cookie("refreshtoken", Newrefreshtoken, options)
            .json(
                new Apiresponse(201, "acess token refreshed")
            )
    } catch (error) {
        throw new Apierror(401, error?.message || "invalid accesstoken")
    }
})






const changecurrentpassword = asynchandler(async (req, res) => {
    const { oldpassword, newpassword } = req.body

    const user = await User.findById(req.user?._id)
    const isPasswordCorrect = await user.isPasswordCorrect(oldpassword)

    if (!isPasswordCorrect) {
        throw new Apierror(400, "invalid old password")
    }

    user.password = newpassword
    await user.save({ validateBeforeSave: false })

    return res.status(200).json(new Apiresponse(200, {}, "password Chamge successfully"))
})


const getcurrentuser = asynchandler(async () => {   
    return res.status(200).json(new Apiresponse(200, req.user, "current user fetched successfully"))
})

const updateaccountdetails = asynchandler(async (req, res) => {
    const { username,  email } = req.body

    if (!username || !email) {
        return Apierror(400, "all fields are required ")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                username, // same as fullname:fullname
                email: email // same as email
            }
        },
        { new: true }).select("-password")

    return res.status(200).json(new Apiresponse(200, user, "account details updated successfully"))
})



const updateuseravatar = asynchandler(async (req, res) => {
    const avatarlocalpath = req.file?.path

    if (!avatarlocalpath) {
        throw new Apierror(400, "Avatar file is missing ")
    }

    const avatar = await uploadOnCloudinary(avatarlocalpath)

    if (!avatar.url) {
        throw new Apierror(400, "error while upload on avatar ")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,

        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select(-"password")

    return res
        .status(200)
        .json(new Apiresponse(200, user, "avatar updated successfully"))
})

const getallusers = asynchandler(async (req, res) => {

    const users = await User.find({})

    return res.status(200).json(new Apiresponse(200, users, "all users fetched successfully"))
})



export {
    registerUser,
    loginuser,
    logoutuser,
    refreshaccesstoken,
    changecurrentpassword,
    getcurrentuser,
    updateaccountdetails,
    updateuseravatar,
    getallusers
}