const { sellerModel } = require('../models/seller');

function createSeller(newSeller) {
    return sellerModel.create(newSeller);
}

function getSellers(id){
    return sellerModel.find({_id: id}).populate("products");;
}

function getAllSellers(){
    return sellerModel.find().populate("products");;
}

function updateSeller(id, product) {
    return sellerModel.update(id, product);
}

function deleteSeller(id, product) {
    return sellerModel.remove(id, product);
}

function getSellerById(id){
    return sellerModel.findById(id).populate("products");
}

module.exports = { createSeller, getSellers, getAllSellers, updateSeller, deleteSeller, getSellerById };