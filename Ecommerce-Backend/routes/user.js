const express = require('express');
const { createUser, getUsers, updateUser, deleteUser, getUserById } = require('../controllers/user');
const { getSellers } = require('../controllers/seller');
const { auth } = require('../authentication/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { userModel } = require('../models/user');
const { userRole } = require('../authentication/roles/user');

const router = express();


router.post('/', async(req, res, next) => {
    try{
        const newUser = await createUser(req.body);
        console.log(newUser)
        res.json(newUser);
    }catch(error){
        res.status(401).send(error);
    }
})

router.post('/login', async(req, res) => {
    try{
        const { email, password } = req.body;
        const user = await userModel.findOne({email: email});
        if(user){
            const passwordValidate = await bcrypt.compare(password, user.password);
            console.log(passwordValidate);
            if(passwordValidate){
                const token = jwt.sign({
                    data: {email: user.email, userId: user.id}
                }, process.env.SECRET)
                res.send(token);
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

router.patch('/', auth, userRole, async (req, res) => {
    try {
        const userId = req.userId;
        const userToUpdate = req.body;
        const updatedUser = await updateUser(userId, userToUpdate);
        res.json(updatedUser);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.delete('/', auth, userRole, async (req, res) => {
    try {
        const userId = req.userId;
        const id = req.params.id;
        const userToDelete = req.body;
        const deletedUser = await deleteUser(userId, userToDelete);
        res.json(deletedUser);
    }catch (err) {
        res.status(500).send(err.message);
    }
})

router.get('/', auth, async(req, res, next) => {
    try{
        const ifSeller = await sellerModel.findById(req.userId);
        const ifUser = await userModel.findById(req.userId);
        if(ifUser){
        const userId = req.userId;
        const user = await getUsers(userId);
        res.json(user);
        }
        if(ifSeller){

        }
    }catch(error){
        res.status(500).send(error.message);
    }
})

// router.get('/:id', auth, async(req, res, next) => {
//     try{
//         const userId = req.userId;
//         const id  = req.params.id;
//         const user = await getUserById(userId, id);
//         res.json(user);
//     }catch(error){
//         res.status(500).send(error.message);
//     }
// })

module.exports = router;