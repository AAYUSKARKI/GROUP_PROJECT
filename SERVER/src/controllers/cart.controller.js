import Cart from "../models/cart.model.js";
import {asynchandler} from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";

const createCart = asynchandler(async (req, res) => {
    const { quantity, product } = req.body;
    const user = req.user._id;

    if (!quantity || !product) {
        throw new Apierror(400, "All fields are required");
    }

    const cart = await Cart.create({
        user,
        quantity,
        product
    });

    res.status(200).json(
        new Apiresponse(
            200,
            "Cart created successfully",
            cart
        )
    )
})

const getCart = asynchandler(async (req, res) => {
    const user = req.user._id;
    const cart = await Cart.find({ user }).populate("product").populate("user");
    if (!cart) {
        throw new Apierror(404, "Cart not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "Cart fetched successfully",
            cart
        )
    )
})

const updateCart = asynchandler(async (req, res) => {
    const {quantity} = req.body;
    const cartid = req.params.id;

    if (!quantity) {
        throw new Apierror(400, "All fields are required");
    }

    const cart = await Cart.findByIdAndUpdate(cartid, req.body, {
        new: true,
        runValidators: true,
    });

    if (!cart) {    
        throw new Apierror(404, "Cart not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "Cart updated successfully",
            cart
        )
    )
})

const deleteCart = asynchandler(async (req, res) => {
    const cart = await Cart.findByIdAndDelete(req.params.id);
    if (!cart) {
        throw new Apierror(404, "Cart not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "Cart deleted successfully",
            cart
        )
    )
})


export { createCart, getCart, updateCart, deleteCart }
