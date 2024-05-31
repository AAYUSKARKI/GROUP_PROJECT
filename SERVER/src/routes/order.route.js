import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder
} from "../controllers/order.controller.js";


const router = Router();


router.route("/createorder").post(verifyJWT, createOrder);

router.route("/getorders").get(verifyJWT, getOrders);

router.route("/getorderbyid/:id").get(verifyJWT, getOrderById);

router.route("/deleteorder/:id").delete(verifyJWT, deleteOrder);


export default router