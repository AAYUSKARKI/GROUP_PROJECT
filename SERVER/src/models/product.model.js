import mongoose, { Schema } from "mongoose"

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required: true
    },
    discount:{
        type: Number,
    },
    image:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    size:{
        type: String,
        enum: ['S', 'M', 'L', 'XL']
    },
    color:{
        type: String
    },
    rating:{
        type: Number,
        default: 0,
        min: 0,
        max: 5
    }
},

{
    timestamps: true

})
const Product = mongoose.model('Product', productSchema)

export default Product