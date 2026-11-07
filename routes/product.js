import { Router } from "express";
import { deleteProduct, getAllProducts, getProductById, updateProduct } from "../conrollers/products";

const router =Router();

router.get('/',getAllProducts);
router.get('/:id',getProductById);
router.put('/:id',updateProduct);
router.delete('/:id',deleteProduct);
export default router;
