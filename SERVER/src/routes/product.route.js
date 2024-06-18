import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js"
// import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
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
    AutoCompletesearch,
    Allproducts
} from "../controllers/product.controller.js";


const router = Router();


router.route("/createproduct").post(upload.single("image"),createProduct);

router.route("/getallproducts").get(getAllProducts);

router.route("/getproductbyid/:id").get(getProductById);

router.route("/updateproduct/:id").put(upload.single("image"),updateProduct);

router.route("/deleteproduct/:id").delete(deleteProduct);

router.route("/searchproduct").get(searchProduct);

router.route("/filterproduct").get(filterProduct);

router.route("/getproductbycategory/:key").get(getProductByCategory);

router.route("/gettopproducts").get(getTopProducts);

router.route("/getproductbydiscount").get(getProductByDiscount);

router.route("/rateproduct/:id").post(rateProduct);

router.route("/autocompletesearch").get(AutoCompletesearch);

router.route("/allproducts").get(Allproducts);

export default router