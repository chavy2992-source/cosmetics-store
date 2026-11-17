import Joi from "joi";

export const productSchema=Joi.object({
    name:Joi.string().lowercase().required(),
    price:Joi.number().positive().required(),
    stockQuantity:Joi.number().integer().positive().default(0).min(0),

})