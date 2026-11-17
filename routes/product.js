import { Router } from "express";
import { getAllProducts, getProductById, addProduct, updateProduct, deleteProduct } from "../controllers/product.js";
import { validateBody } from "../Middlewares/validateJoi.middleware.js";
import { productSchema } from "../Validations/product.js";

const router = Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", validateBody(productSchema), addProduct);
router.put("/:id", validateBody(productSchema), updateProduct);
router.delete("/", deleteProduct);

export default router;