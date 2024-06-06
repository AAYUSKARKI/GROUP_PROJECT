import Order from "../models/order.model.js";
import {asynchandler} from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";

const createOrder = asynchandler(async (req, res) => {
    const { quantity,productid,fullname, address, city, postalCode, country, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;
    if (!quantity || !productid || !shippingAddress || !paymentMethod || !itemsPrice || !taxPrice || !shippingPrice || !totalPrice) {
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
        fullName: fullname,
        address,
        city,
        postalCode,
        country
    }

    const order = await Order.create({
        user,
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    });

    const Formdata = {
        amount: "100",
        failure_url: "https://localhost:5173",
        product_delivery_charg: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: "YVweM7CgAtZW5tRKica/BIeYFvpSj09AaInsulqNKHk=",
        signed_field_names: "total_amount,transaction_uuid,product_code",
        success_url: 'https://localhost:5173/success',
        tax_amount: "10",
        total_amount: "110",
        transaction_uuid: "ab14a8f2b02c3"
        }

    res.status(200).json(
        new Apiresponse(
            200,
            "Order created successfully",
            order
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
            "orders fetched successfully",
            orders
        )
    )
})

const getOrderById = asynchandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user").populate("orderItems.product");
    if (!order) {
        throw new Apierror(404, "order not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "order fetched successfully",
            order
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
