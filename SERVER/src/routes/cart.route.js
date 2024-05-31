import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCart, getCart, updateCart, deleteCart } from "../controllers/cart.controller.js";


const router = Router();


router.route("/createcart").post(verifyJWT, createCart);

router.route("/getcart").get(verifyJWT, getCart);

router.route("/updatecart/:id").put(verifyJWT, updateCart);

router.route("/deletecart/:id").delete(verifyJWT, deleteCart);


export default router