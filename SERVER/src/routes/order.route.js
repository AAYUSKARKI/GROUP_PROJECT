import { Router } from "express";
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder,
    verifyPayment,
    getAllOrders,
    updateOrderstatus
} from "../controllers/order.controller.js";


const router = Router();


router.route("/createorder").post(createOrder);

router.route("/getorders").post(getOrders);

router.route("/verify").post(verifyPayment);

router.route("/getorderbyid/:id").get(getOrderById);

router.route("/deleteorder/:id").delete(deleteOrder);

router.route("/getallorders").get(getAllOrders);

router.route("/updateorderstatus/:orderId").put(updateOrderstatus);


export default router