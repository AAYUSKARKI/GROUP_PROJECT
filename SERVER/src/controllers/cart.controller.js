import Cart from "../models/cart.model.js";
import {asynchandler} from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";

const createCart = asynchandler(async (req, res) => {
    const { quantity, product } = req.body;
    console.log(req.body);
    const user = req.user._id;

    if (!quantity || !product) {
        throw new Apierror(400, "All fields are required");
    }

    //check if the product is already in the cart
    const cartexists = await Cart.findOne({ user, product });
    if (cartexists) {
        cartexists.quantity += quantity;
        await cartexists.save();
        return res.status(200).json(
            new Apiresponse(
                200,
                cartexists,
                "Added to cart successfully"
            )
        )
    }

    const cart = await Cart.create({
        user,
        quantity,
        product
    });

    res.status(200).json(
        new Apiresponse(
            200,
            cart,
            "Cart created successfully"
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
            cart,
            "Cart fetched successfully"
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
            cart,
            "Cart updated successfully"
            
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
            cart,
            "Cart deleted successfully"
        )
    )
})

const getSingleCart = asynchandler(async (req, res) => {
    const cart = await Cart.findById(req.params.id).populate("product").populate("user");
    if (!cart) {
        throw new Apierror(404, "Cart not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            cart,
            "Cart fetched successfully"
        )
    )
})


export { createCart, getCart, updateCart, deleteCart, getSingleCart };
