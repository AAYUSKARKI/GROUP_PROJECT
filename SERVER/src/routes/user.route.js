import { Router } from "express";
import {
    loginuser,
    registerUser,
    logoutuser,
    refreshaccesstoken,
    changecurrentpassword,
    getcurrentuser,
    updateaccountdetails,
    updateuseravatar,
    getallusers,
    getuserbyid,
    updateuser,
    deleteuser,
    forgetpassword,
    resetpassword
}
    from "../controllers/user.controller.js";

import { upload } from "../middlewares/multer.middleware.js"
// import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

    router.route("/updateuser").post(
        upload.fields([
            {
                name: "avatar",
                maxCount: 1
            }, {
                name: "coverImage",
                maxCount: 1
            }
        ]),
        updateuser)

router.route("/login").post(loginuser)

//seruce routes
router.route("/logout").post(logoutuser)
router.route("/refreshtoken").post(refreshaccesstoken)
router.route("/changepassword").post(changecurrentpassword)
router.route("/currentuser").get(getcurrentuser)
router.route("/updateaccount").patch(updateaccountdetails)
router.route("/avatar").patch(upload.single("avatar"), updateuseravatar)
router.route("/allusers").get(getallusers)
router.route("/getuserbyid/:id").get(getuserbyid)
router.route("/deleteuser/:id").delete(deleteuser)
router.route("/forgetpassword").post(forgetpassword)
router.route("/resetpassword/:token").post(resetpassword)

export default router //can be imported by any name _eg RegisterUser