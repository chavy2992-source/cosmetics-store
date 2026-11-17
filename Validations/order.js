import Joi from "joi";

export const orderSchema = Joi.object({
    userId: Joi.string().hex().length(24).required(),

    shippingAddress: Joi.object({
        city: Joi.string().min(2).max(50).trim().required(),
        street: Joi.string().min(2).max(50).trim().optional(),
        num: Joi.number().integer().positive().optional()
    }).required(),

    items: Joi.array().items(
        Joi.object({
            _id: Joi.string().hex().length(24).required(),
            amount: Joi.number().integer().min(1).required(),
            priceAtPurchase: Joi.number().positive().required()
        })
    ).min(1).required(),

    totalAmount: Joi.number().positive().required()
});