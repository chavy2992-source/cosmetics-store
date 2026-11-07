import exprres from 'express';
import { connect } from 'mongoose';

const app =exprres();

connectoDB();
app.use(exprres.json());
app.use(exprres.urlencoded({extended :true}));



app.get('/', (req, res) => {
    res.send('Hello World')
});

app.use(printMsg);

app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(errorHandler);

const port = process.env.PORT ?? 4000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});