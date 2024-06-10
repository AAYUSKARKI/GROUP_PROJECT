<<<<<<< HEAD
import {asynchandler} from "../utils/asynchandler.js"
import {Apierror} from "../utils/apiError.js"
=======
import { asynchandler } from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js"
>>>>>>> 2bbd5e6ce9e4c5e8a3f16fb146b1cdb26af69a3e
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

   const user = await User.findById(decodedtoken?._id).select("-passowrd -refreshtoken")

   if (!user){
       throw new Apierror(401,"invalid Acess token")
   }
   req.user = user;
   next()
 } catch (error) {
    throw new Apierror(401,error?.message|| InvalidAccessToken)
 }

})

