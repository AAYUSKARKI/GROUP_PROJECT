import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createWishlist,
    getWishlist,
    deleteWishlist
} from "../controllers/wishlist.controller.js";


const router = Router();


router.route("/createwishlist").post(verifyJWT, createWishlist);

router.route("/getwishlist").get(verifyJWT, getWishlist);

router.route("/deletewishlist/:id").delete(verifyJWT, deleteWishlist);


export default router