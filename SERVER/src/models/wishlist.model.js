import mongoose,{Schema} from "mongoose"

const wishlistSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Wishlist = mongoose.model("Wishlist", wishlistSchema)

export default Wishlist