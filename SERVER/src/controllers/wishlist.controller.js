import Wishlist from "../models/wishlist.model.js";
import {asynchandler }from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import {Apiresponse} from "../utils/apiresponse.js";


const createWishlist = asynchandler(async (req, res) => {
    const { product } = req.body;
    const user = req.user._id;
    if (!product) {
        throw new Apierror(400, "All fields are required");
    }

    const wishlist = await Wishlist.create({
        user,
        product
    });

    res.status(200).json(
        new Apiresponse(
            200,
            "wishlist created successfully",
            wishlist
        )
    )
})

const getWishlist = asynchandler(async (req, res) => {
    const user = req.user._id;
    const wishlist = await Wishlist.find({ user }).populate("product").populate("user");
    if (!wishlist) {
        throw new Apierror(404, "wishlist not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "wishlist fetched successfully",
            wishlist
        )
    )
})

const deleteWishlist = asynchandler(async (req, res) => {
    const wishlist = await Wishlist.findByIdAndDelete(req.params.id);
    if (!wishlist) {
        throw new Apierror(404, "wishlist not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "wishlist deleted successfully",
            wishlist
        )
    )
})


export {
    createWishlist,
    getWishlist,
    deleteWishlist
}