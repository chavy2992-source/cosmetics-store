import Joi from "joi";
//התחברות של משתמש קיים
export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    passWord: Joi.string().required(),
});
//הרשמה של חדש
export const signUpSchema=Joi.object({
    fullName: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
    passWord: Joi.string().min(6).required(),
    phone: Joi.string().pattern(/^[0-9]{9,10}$/).optional(),
    address: Joi.object().optional()
});
export const updatePassWordSchema=Joi.object({
        passWord: Joi.string().required(),
    repeatPassWord: Joi.string().valid(Joi.ref("passWord")).required(),

});