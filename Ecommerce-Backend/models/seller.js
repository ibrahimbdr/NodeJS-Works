const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const sellerSchema = mongoose.Schema({
    
        sellerId: { type: 'string', required: true },
        shopName: { type: 'string', required: true },
        type: { type: 'string', required: true },
        accountManager: { type: 'string', required: true },
        accountManagerPhone: { type: 'string', required: true },
        accountManagerPhone2: { type: 'string' },
        email: { type: 'string', required: true },
        password: { type: 'string', required: true },
        referredBy: { type: 'string' },
        existShops: { type: 'string' },
        existShopsNames: { type: 'string' },
        existShopsReason: { type: 'string' },
        companyRegisteredName: { type: 'string' },
        Address1: { type: 'string' },
        Address2: { type: 'string' },
        postalCode: { type: 'string' },
        city: { type: 'string', required: true },
        country: { type: 'string' },
        bussinessOwnerFN: { type: 'string' },
        bussinessOwnerMN: { type: 'string' },
        bussinessOwnerLN: { type: 'string' },
        bussinessOwnerBirth: { type: 'string' },
        bussinessOwnerIDType: { type: 'string' },
        IDNumber: { type: 'string' },
        IDCopy: { type: 'string' },
        employeesNumbers: { type: 'string' },
        commercialRegisterNumber: { type: 'string' },
        commercialRegisterCopy: { type: 'string' },
        taxID: { type: 'string' },
        taxIDCopy: { type: 'string' },
        VATRegistrationNumber: { type: 'string' },
        VATRegistrationCopy: { type: 'string' },
        shippingCountry: { type: 'string', required: true },
        bankName: { type: 'string' },
        bank: { type: 'string' },
        bankCode: { type: 'string' },
        accountName: { type: 'string' },
        accountNumber: { type: 'string', required: true },
        SWIFT: { type: 'string' },
        IBAN: { type: 'string' },
        paybalAccount: { type: 'string', required: true },
        accessToken: { type: 'string', default: ''},
        products: [{ type: 'ObjectId', required: true, trim: true, default: []}],
      
})

sellerSchema.pre('save', function (next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;
    next();
})

const sellerModel = mongoose.model('Seller', sellerSchema);

module.exports = { sellerModel };