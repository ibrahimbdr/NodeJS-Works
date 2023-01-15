const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');

const orderSchema = mongoose.Schema({
    products: { type: [mongoose.Schema.ObjectId], required: true },
    orderUser: {type: mongoose.Schema.ObjectId, ref: 'User'},
    status: {type: 'string', enum : ['pending','succeed', 'cancelled'], default: 'pending'}
})

orderSchema.plugin(timestamps);

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;