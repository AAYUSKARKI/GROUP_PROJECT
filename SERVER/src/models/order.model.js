import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
   user:{
       type: Schema.Types.ObjectId,
       ref: "User"
   },
   orderItems:[{
       qty: Number,
       product: {
           type: Schema.Types.ObjectId,
           ref: "Product"
       }
   }],
   shippingAddress: {
       fullName: String,
       address: String,
       city: String,
       postalCode: String,
       country: String
   },
   paymentMethod: String,
   itemsPrice: Number,
   shippingPrice: Number,
   taxPrice: Number,
   totalPrice: Number,
   isPaid: Boolean,
   paidAt: Date,
   isDelivered: Boolean,
   deliveredAt: Date
},
{ timestamps: true 

})

const Order = mongoose.model("Order", orderSchema)

export default Order