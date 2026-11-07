import { isValidObjectId } from "mongoose";
import Product from "../models/products";
export const getAllProducts=async(req,res,next)=>{
 try{
    const {page=1,limit=10}=req.query;
    const products=await Product.find()
    .skip((page-1)*limit)
    .limit(limit);
    const total=await Product.find().countDocuments();
    return res.json({data: products,total});    
 }
 catch(error){
    res.status(500).json({error:error});
 }
};

export const getProductById=async(req,res,next)=>{
  try{
  const {id} =req.params;
  if(!isValidObjectId(id))
   return res.statu(404).json({error:'Product not founf'});
  const product=await Product.findById(id);
  if(!product){
     return res.statu(404).json({error:'Product not found'});
  }
  return res.json({product});
}
catch(error){
   res.statu(500).json({error:error});
}
};
export const addProduct =async (req,res,next)=>{
    try{
    const newProduct=new Product(req.body);
    await newProduct.save();
     res.status(201).json(newProduct);
    }
    catch(error){
       res.status(500).json({error:error});
    }
};
export const updateProduct=async (req,res,next)=>{
  try{
    console.log(req.body);
     const {id} =req.params;
     if(!isValidObjectId(id))
        return res.status(404).json({error:'product not found'});
    const product=await Product.findByIdAndUpdate(id,
        {
        $set: req.body.x,
        $addToSet: {categories: req.body.y},
        },
         {new :true});
         if(!product){
            return res.status(404).json({error:'product not found'});}
         res.json(product);
    }
    catch(error){
        res.status(500).json({error:error});
    }
};
export const deleteProduct=async (req,res,next)=>{
    try{
        const {id}=req.body;
        if(!isValidObjectId(id))
            return res.status(404).json({error:'product is not find'});
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({error:'product is not found'});}
        res.status(204).json();
    }
    catch(error){
        res.status(500).json({error:error});
    }
};