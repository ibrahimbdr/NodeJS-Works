const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp'); 

const productSchema = mongoose.Schema({
    title: {type: 'string', required: true},
    title_ar: {type: 'string', required: true},
    brand: {type: 'string', required: true},
    brand_ar: {type: 'string', required: true},
    category: {type: 'string', required: true},
    category_ar: {type: 'string', required: true},
    description: {type: 'string', required: true},
    description_ar: {type: 'string', required: true},
    specifications: {type: 'string', required: true},
    specifications_ar: {type: 'string', required: true},
    price: {type: 'number', required: true},
    rating: {
        rate: {type: 'string', default: 0},
        rateNumber: {type: 'string', default: 0},
        likes: {type: 'string', default: 0},
        reviews: {type: [String], default: []},
    },
    quantity: {type: 'number', required: true},
    mImage: {type: 'string', required: true},
    aImages: {type: [String], default: []},
    sellerId: {type: mongoose.Schema.ObjectId, ref: 'Seller'}
})

productSchema.plugin(timestamps);

const productModel = mongoose.model('Product', productSchema);

module.exports = { productModel };