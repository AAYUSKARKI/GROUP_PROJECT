import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCart, getCart, updateCart, deleteCart , getSingleCart} from "../controllers/cart.controller.js";


const router = Router();


router.route("/createcart").post(createCart);

router.route("/getcart").get(getCart);

router.route("/updatecart/:id").put(verifyJWT, updateCart);

router.route("/deletecart/:id").delete(verifyJWT, deleteCart);

router.route("/getsinglecart/:id").get(verifyJWT, getSingleCart);


export default router
