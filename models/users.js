import { Schema } from "mongoose";
const userSchema=new Schema({
    fullName:String,
    email:String,
    passWord:String,
    phone:String,
    address:Object,
    role:String,
    creatAt:Date
})
const user=model('users',userSchema)