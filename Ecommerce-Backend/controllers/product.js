const { productModel } = require('../models/product');
const { sellerModel } = require('../models/seller');



function registerProduct(product) {
    
    return productModel.create(product);
}


function updateProduct(id, product){
    return productModel.update({_id: id}, product, {runValidators: true});
}


function deleteProduct(id){
    return productModel.findByIdAndRemove(id);
}


// function getProduct() {
//     return productModel.find().populate("seller", "name");
// }


function getProduct(SellerId) {
    
    if(SellerId!=null){
        return  productModel.find({id: SellerId}).populate("sellerId","shopName");
    }else{
        return  productModel.find().populate("sellerId","shopName");
    }
}

// function getProduct(SellerId) {
    
//         return  productModel.find();

// }

function getSellerByName(sellerName){
    return sellerModel.findOne({name: sellerName});
}

module.exports = { registerProduct, updateProduct, deleteProduct, getProduct, getSellerByName };