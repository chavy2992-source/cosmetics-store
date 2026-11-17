import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import { printMsg } from './Middlewares/custom.middleware.js';
import { errorHandler } from './Middlewares/errores.middleware.js';
import productRouter from './routes/product.js';
import userRouter from './routes/users.js';
import orderRouter from './routes/orders.js';

const app = express();

connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(printMsg);

app.use('/products', productRouter);
app.use('/users', userRouter);
app.use('/orders', orderRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});