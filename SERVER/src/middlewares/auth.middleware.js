import { asynchandler } from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js"
import jwt from "jsonwebtoken";
import {User} from "../models/user.model.js"


export const verifyJWT = asynchandler(async(req,res,next)=>{
 try {
    const token = req.cookies?.accesstoken || req.header("Authorization")?.replace("Bearer", "")
   console.log(token)
    if(!token){
       throw new Apierror(401,"unathorized token")
    }

    const decodedtoken= jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    console.log(decodedtoken,'decodedtoken')

   const user = await User.findById(decodedtoken?._id).select("-password -refreshtoken")

   if (!user){
       throw new Apierror(401,"invalid Acess token")
   }
   req.user = user;
   next()
 } catch (error) {
    throw new Apierror(401,error?.message|| InvalidAccessToken)
 }

})

