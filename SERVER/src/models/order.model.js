import mongoose, { Schema } from "mongoose";


const orderSchema = new Schema({
   user:{
       type: Schema.Types.ObjectId,
       ref: "User"
   },
   orderItems:[{
       quantity: Number,
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
   deliveredAt: Date,
   transaction_uuid: String,
   product_code: String,
   total_amount: Number,
   signature: String,
   status: {
       type: String,
       default: "Pending",
       enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]
   }
},
{ timestamps: true 

})

const Order = mongoose.model("Order", orderSchema)

export default Order