const { userModel } = require('../models/user');

function createUser(newUser) {
    console.log(newUser);
    return userModel.create(newUser);
}

function getUsers(_id){
    return userModel.find({id: _id}).populate("orders","products createdAt");
}

function getAllUsers(){
    return userModel.find().populate("orders","products createdAt");
}

function updateUser(id, newUser) {
    return userModel.update(id, newUser);
}

function deleteUser(id, product) {
    return userModel.remove(id, product);
}

function getUserById(id){
    return userModel.findById(id).populate("orders","products createdAt");
}

module.exports = { createUser, getUsers, getAllUsers, updateUser, deleteUser, getUserById };