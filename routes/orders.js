import { Router } from "express";
import { getAllOrders, getOrderById, addOrder } from "../controllers/orders.js";
import { validateBody } from "../Middlewares/validateJoi.middleware.js";
import { orderSchema } from "../Validations/order.js";

const router = Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", validateBody(orderSchema), addOrder);

export default router;