import { isValidObjectId } from "mongoose";
import Order from "../models/orders.js";
import Product from "../models/product.js";
import { AppError } from "../utils/AppError.js";

// 1. קבלת כל ההזמנות (כולל דפדוף וחיבור פרטי משתמש)
export const getAllOrders = async (req, res) => {
    const page = Number(req.query.page ?? 1);
    const limit = Number(req.query.limit ?? 10);

    if (!Number.isInteger(page) || page < 1 || !Number.isInteger(limit) || limit < 1) {
        throw new AppError("page and limit must be positive integers", 400, "validation-error");
    }
    const [orders, total] = await Promise.all([
        Order.find()
            .populate('userId', 'fullName email')
            .skip((page - 1) * limit)
            .limit(limit),
        Order.countDocuments(),
    ]);

    return res.json({ data: orders, total });
};

// 2. קבלת הזמנה ספציפית לפי מזהה
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
        throw new AppError("order not found", 404, "not-found");
    }

    const order = await Order.findById(id)
        .populate('userId', 'fullName email')
        .populate('items._id', 'name price');

    if (!order) {
        throw new AppError("order not found", 404, "not-found");
    }

    return res.json(order);
};

// 3. יצירת הזמנה חדשה
export const addOrder = async (req, res) => {
    // איסוף כל מזהי המוצרים שנשלחו בתוך items
    const productIds = req.body.items.map(({ _id }) => _id.toLowerCase());

    // שליפת המוצרים הקיימים ממסד הנתונים
    const products = await Product.find({ _id: { $in: productIds } });
    const productsById = new Map(products.map((product) => [product.id.toLowerCase(), product]));

    if (productsById.size !== new Set(productIds).size) {
        throw new AppError("one or more products were not found", 404, "not-found");
    }

    let calculatedTotal = 0;

    // הרכבת מערך הפריטים וחישוב הסכום הכולל מתוך מחירי האמת במסד הנתונים
    const orderItems = req.body.items.map(({ _id, amount }) => {
        const product = productsById.get(_id.toLowerCase());
        calculatedTotal += product.price * amount;

        return {
            _id: product._id,
            amount,
            priceAtPurchase: product.price,
        };
    });
// אוביקט "באוויר" לא בדטהבייס

    const order = new Order({
        userId: req.body.userId,
        shippingAddress: req.body.shippingAddress,
        items: orderItems,
        totalAmount: req.body.totalAmount ?? calculatedTotal,
        orderDate: new Date(),
    });
    //שומר בDATABASE
    await order.save();

    return res.status(201).json(order);
};