import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    product:{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }
},
  {
     timestamps: true 
})

const Cart = mongoose.model("Cart", cartSchema)

export default Cart