import Order from "../models/order.model.js";
import {asynchandler} from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from "crypto-js";
const createOrder = asynchandler(async (req, res) => {
    const { quantity,productid,fullname, address, city, postalCode, country, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    console.log(req.body);
    if (!quantity || !productid || !paymentMethod || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
        throw new Apierror(400, "All fields are required");
    }
    const user = req.user._id;

    const orderItems = [
        {
            product: productid,
            quantity
        }
    ];

    const shippingAddress = {
        fullName : fullname,
        address,
        city,
        postalCode,
        country
    }

    
    const transactionUUID = uuidv4();
    const productCode = "EPAYTEST";

     // Create the string to sign
     const fieldsToSign = `total_amount=${totalPrice},transaction_uuid=${transactionUUID},product_code=${productCode}`;

     const hash = CryptoJS.HmacSHA256(fieldsToSign, "8gBm/:&EnhH.1/q");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    const order = await Order.create({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        total_amount: totalPrice,
        transaction_uuid: transactionUUID,
        signature: hashInBase64,
        product_code: "EPAYTEST",
    });


    res.status(200).json(
        new Apiresponse(
            200,
            order,
            "Order created successfully"          
        )
    )
})

const getOrders = asynchandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id }).populate("user").populate("orderItems.product");
    if (!orders) {
        throw new Apierror(404, "orders not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            orders,
            "orders fetched successfully"
        )
    )
})

const getOrderById = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user").populate({
        path: 'orderItems.product', // Path to populate
        model: 'Product' // Model to use for population
    });
    if (!order) {
        throw new Apierror(404, "order not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            order,
            "order fetched successfully"
        )
    )
})

const deleteOrder = asynchandler(async (req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
        throw new Apierror(404, "order not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "order deleted successfully",
            order
        )
    )
})

export { 
    createOrder,
    getOrders,
    getOrderById,
    deleteOrder
}
