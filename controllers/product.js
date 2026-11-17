import { isValidObjectId } from "mongoose";
import Product from "../models/product.js";
import { AppError } from "../utils/AppError.js";

export const getAllProducts = async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        throw new AppError("page and limit must be positive integers", 400, "validation-error");
    }

    const [products, total] = await Promise.all([
        Product.find().skip((page - 1) * limit).limit(limit),
        Product.countDocuments()
    ]);

    return res.json({ data: products, total });
};

export const getProductById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("Product not found", 404, "not-found");
    }

    const product = await Product.findById(id);
    if (!product) {
        throw new AppError("Product not found", 404, "not-found");
    }

    return res.json({ product });
};

export const addProduct = async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    return res.status(201).json(newProduct);
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("Product not found", 404, "not-found");
    }

    const product = await Product.findByIdAndUpdate(
        id,
        {
            $set: req.body.x,
            $addToSet: { categories: req.body.y }
        },
        { new: true }
    );

    if (!product) {
        throw new AppError("Product not found", 404, "not-found");
    }

    return res.json(product);
};

export const deleteProduct = async (req, res) => {
    const { id } = req.body;

    if (!isValidObjectId(id)) {
        throw new AppError("Product not found", 404, "not-found");
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
        throw new AppError("Product not found", 404, "not-found");
    }

    return res.status(204).json();
};