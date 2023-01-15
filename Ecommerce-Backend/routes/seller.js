const express = require('express');
const { createSeller, getSellers, updateSeller, deleteSeller, getSellerById } = require('../controllers/seller');
const { auth } = require('../authentication/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { sellerModel } = require('../models/seller');
const { sellerRole } = require('../authentication/roles/seller');

const router = express();


router.post('/', async(req, res, next) => {
    try{
        const newSeller = await createSeller(req.body);
        console.log(newSeller)
        res.json(newSeller);
    }catch(error){
        res.status(401).send("error");
    }
})

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;
        let seller = await sellerModel.findOne({email: email});
        console.log(seller);
        if(seller){
            const passwordValidate = await bcrypt.compare(password, seller.password);
            console.log(passwordValidate);
            if(passwordValidate){
                const token = jwt.sign({
                    data: {email: seller.email, userId: seller.id}
                }, process.env.SECRET)
                await sellerModel.findOneAndUpdate(seller.id, {"accessToken": token});
                seller = await sellerModel.findOne({email: email});
                res.json(seller);
            }else{
                res.status(403).send("Invalid Authentication");
            }
        }else{
            res.status(403).send("Invalid Authentication");
        }
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.patch('/', auth, sellerRole, async (req, res) => {
    try {
        const userId = req.userId;
        const sellerToUpdate = req.body;
        const updatedSeller = await updateSeller(userId, sellerToUpdate);
        res.json(updatedSeller);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/', auth, sellerRole, async (req, res) => {
    try {
        const userId = req.userId;
        const sellerToDelete = req.body;
        const deletedSeller = await deleteSeller(userId, sellerToDelete);
        res.json(deletedSeller);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', async(req, res, next) => {
    try{

        const userId = '63a4f936c73d391eda404d83';
        const Seller = await getSellers(userId);
        res.json(Seller);
    }catch(error){
        res.status(500).send(error.message);
    }
})

router.get('/:id', async(req, res, next) => {
    try{
        const id  = req.params.id;
        const Seller = await getSellerById(id);
        res.json(Seller);
    }catch(error){
        res.status(500).send(error.message);
    }
})

module.exports = router;