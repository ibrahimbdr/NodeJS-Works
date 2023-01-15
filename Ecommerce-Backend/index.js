const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const sellerRouter = require('./routes/seller');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const adminRouter = require('./routes/admin');

const app = express();
mongoose.connect(`mongodb://localhost:27017/tagstore`);
app.use(cors({
    origin: '*'
}));
app.use(express.json());


app.use('/seller', sellerRouter);
app.use('/user', userRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/admin', adminRouter);

app.use("*", (req, res, next) => {
    res.status(404).send("Page is Not Found");
})

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('Server is listening on port: ' + PORT));
