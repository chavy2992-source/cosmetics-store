import { model, Schema, SchemaTypes } from "mongoose";

const orderSchema = new Schema({
    userId: { type: SchemaTypes.ObjectId, ref: 'users', required: true },

    // 1. Embedded Documents - מסמכים משובצים (כתובת היעד למשלוח)
    shippingAddress: {
        city: { type: String, required: true },
        street: String,
        num: Number
    },

    // 2. שילוב References + Embedded (רשימת המוצרים בהזמנה)
    items: [{
        _id: { type: SchemaTypes.ObjectId, ref: 'products' },
        amount: Number,
        priceAtPurchase: Number
    }],

    totalAmount: Number,

    paymentStatus: {
        type: String,
        enum: ['שולם', 'ממתין לאישור'],
        default: 'ממתין לאישור'
    },

    orderStatus: {
        type: String,
        enum: ['התקבלה', 'נארזת', 'נשלחה', 'הושלמה'],
        default: 'התקבלה'
    },

    orderDate: { type: Date, default: Date.now }
});

const Order = model('orders', orderSchema);

export default Order;