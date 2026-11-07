import { model, Schema } from "mongoose";

const productSchema = new Schema({
    name: String,
    categories: [String] ,
    subCategory :[String],
    description:String,
     price: Number,
     imageUrl:String,
    inStock:Boolean,
    stockQuantity: Number,
    isBestSeller: Boolean,
    creatAt: Date

});

const Product = model('products', productSchema);

export default Product;