import Product from "../models/product.model.js";
import {asynchandler} from "../utils/asynchandler.js";
import {Apierror} from "../utils/apierror.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import {Apiresponse} from "../utils/apiresponse.js";

const createProduct = asynchandler(async (req, res) => {
    const { name, description, category, price, discount, quantity,color,size } = req.body;
    console.log(req.body);

    if (!name || !description || !category || !price || !discount || !quantity || !color || !size) {
        throw new Apierror(400, "All fields are required");
    }

    const imagelocalpath = req.file.path;

    if(!imagelocalpath) 
        throw new Apierror(400, "image is required")


    const image = await uploadOnCloudinary(imagelocalpath);

    if(!image) 
        throw new Apierror(400, "image is not uploaded")

    const product = await Product.create({
        name,
        description,
        category,
        price,
        image:image.url,
        discount,
        quantity,
        color,
        size
    });

    const createdProduct = await Product.findById(product._id)

    if (!createdProduct) {
        throw new Apierror(400, "product not created");
    }

    res.status(201).json(
        new Apiresponse(
            201,
            "product created successfully",
            createdProduct
        )
    )

});

const getAllProducts = asynchandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const products = await Product.find().skip(skip).limit(limit);

    if (!products) {
        throw new Apierror(404, "products not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            products,
            "products fetched successfully",
        )
    )
});

const getProductById = asynchandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new Apierror(404, "product not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            product,
            "product fetched successfully",
        )
    )
});

const updateProduct = asynchandler(async (req, res) => {
    const { name, description, category, price, discount, quantity,color,size } = req.body;
    console.log(req.body);
    if (!name || !description || !category || !price || !discount || !quantity || !color || !size) {
        throw new Apierror(400, "All fields are required");
    }

    const imagelocalpath = req.file.path;

    if(!imagelocalpath) 
        throw new Apierror(400, "image is required")


    const image = await uploadOnCloudinary(imagelocalpath);

    if(!image) 
        throw new Apierror(400, "image is not uploaded")

    const product = await Product.findByIdAndUpdate(req.params.id,
        {
            name,
            description,
            category,
            price,
            image:image.url,
            discount,
            quantity,
            color,
            size
        },
        {
            new: true,
            runValidators: true,
        });

    if (!product) {
        throw new Apierror(404, "product not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "product updated successfully",
            product
        )
    )
});

const deleteProduct = asynchandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        throw new Apierror(404, "product not found");
    }

    res.status(200).json(
        new Apiresponse(
            200,
            "product deleted successfully",
            product
        )
    )
});

const searchProduct = asynchandler(async (req, res) => {
    const products = await Product.find({ name: { $regex: req.params.key, $options: "i" } });
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "products fetched successfully",
            products
        )
    )
});

const filterProduct = asynchandler(async (req, res) => {
    const products = await Product.find({ category: req.params.key });
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "products fetched successfully",
            products
        )
    )
});

const getProductByCategory = asynchandler(async (req, res) => {
    const products = await Product.find({ category: req.params.key });
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            products,
            "products fetched successfully"
        )
    )
});

const getTopProducts = asynchandler(async (req, res) => {
    const products = await Product.find().sort({ price: -1 }).limit(3);
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "products fetched successfully",
            products
        )
    )
});

const getProductByDiscount = asynchandler(async (req, res) => {
    const products = await Product.find({ discount: { $gte: 0 } });
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            "products fetched successfully",
            products
        )
    )
});

const rateProduct = asynchandler(async (req, res) => {
    const { rating } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
        throw new Apierror(404, "product not found");
    }
    product.rating.push(rating);
    product.numOfReviews = product.rating.length;
    product.rating = product.rating.reduce((acc, item) => item + acc) / product.rating.length;
    await product.save();
    res.status(200).json(
        new Apiresponse(
            200,
            "product rated successfully",
            product
        )
    )
});

const AutoCompletesearch = asynchandler(async (req, res) => {
    const products = await Product.find({ name: { $regex: req.query.key, $options: "i" } });
    if (!products) {
        throw new Apierror(404, "products not found");
    }
    res.status(200).json(
        new Apiresponse(
            200,
            products,
            "products fetched successfully",
        )
    )
});

export {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    searchProduct,
    filterProduct,
    getProductByCategory,
    getTopProducts,
    getProductByDiscount,
    rateProduct,
    AutoCompletesearch
}