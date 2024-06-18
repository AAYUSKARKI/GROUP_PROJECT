import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createCart, getCart, updateCart, deleteCart , getSingleCart} from "../controllers/cart.controller.js";


const router = Router();


router.route("/createcart").post(createCart);

router.route("/getcart").post(getCart);

router.route("/updatecart/:id").put(updateCart);

router.route("/deletecart/:id").post(deleteCart);

router.route("/getsinglecart/:id").post(getSingleCart);


export default router
