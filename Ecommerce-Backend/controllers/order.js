const orderModel = require('../models/order');
const mongoose = require('mongoose');
const { userModel } = require('../models/user');

function makeOrder(newOrder){
    return orderModel.create(newOrder);
}

function changeOrder(id, newOrder){
    return orderModel.update(id, newOrder)
}

function addOrderToUser(userId, _orderId){
    console.log(_orderId);
    // const oId = new ObjectId(_orderId);
    // orderUser.orderId.push(oId);
    return userModel.findOneAndUpdate(
        {id: userId},
        {$push: {orders: _orderId}},
        { runValidators: true }
        );
}

function listOrders(){
    // return orderModel.find()
    return  orderModel.find().populate("orderUser", "fullName");
}

function listOrderByUserId(id){
    // return orderModel.findById(id);
    return  orderModel.find({orderUser: id});
}

module.exports = { makeOrder, changeOrder, addOrderToUser, listOrders, listOrderByUserId };