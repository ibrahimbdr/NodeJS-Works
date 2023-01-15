const express = require('express');
const { registerProduct, updateProduct, deleteProduct, getProduct, getSellerByName } = require('../controllers/product');
const { auth } = require('../authentication/auth');
const router = express();
const { sellerModel } = require('../models/seller');
const { sellerRole } = require('../authentication/roles/seller');
const { userRole } = require('../authentication/roles/user');


router.post('/',auth, sellerRole, async (req, res) => {
    try {
        const newProduct = {...req.body, sellerId:req.userId};
        const registeredProduct = await registerProduct(newProduct);
        console.log("Product has been registered");
        res.json(registeredProduct);

    } catch (err) {
        res.status(500).send(err.message);
    }

})


router.patch('/:id', auth, sellerRole, async (req, res) => {
    try {
        const productToUpdate = req.body;
        const id  = req.params.id;
        const updatedproduct = await updateProduct(id, productToUpdate);
        res.json(updatedproduct);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

// router.patch('/likes/:id', auth, userRole, async (req, res) => {
//     try {
//         const productToUpdate = req.body;
//         const id  = req.params.id;
//         const updatedproduct = await updateProduct(id, productToUpdate);
//         res.json(updatedproduct);
//     }catch (err) {
//         res.status(500).send(err.message);
//     }
// })



router.delete('/:id', auth, sellerRole, async (req, res) => {
    try {
        const id  = req.params.id;
        const deletedproduct = await deleteProduct(id);
        res.json(deletedproduct);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

// router.get('/', async (req, res) => {
//     try {
//         const Product = await getProduct();
//         res.json(Product);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }

// })

router.get('/', async (req, res) => {
    try {
        const seller = await sellerModel.findById(req.userId);
        console.log(seller);
        if (seller != null) {
            let SellerId = req.userId;
            const Product = await getProduct(SellerId);
            res.json(Product);
        }else {
            const sellerName = req.query.name;
            console.log(sellerName);
            let seller;
            let SellerId;
            if(sellerName!=null){
                seller = await getSellerByName(sellerName);
                SellerId = seller.id;
            }
            const Product = await getProduct(SellerId);
            res.json(Product);
        }
    } catch (err) {
        res.status(500).send(err.message);
    }

})





router.get('/:id', auth, async (req, res) => {
    try {
        const id  = req.params.id;
        const Product = await getProductById(id);
        res.json(Product);
    } catch (err) {
        res.status(500).send(err.message);
    }

})

// router.get('/', auth, async (req, res) => {
//     try {
//         const id  = req.params.id;
//         const Product = await getProductById(id);
//         res.json(Product);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }

// })



module.exports = router;

