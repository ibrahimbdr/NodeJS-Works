const express = require('express');
const { createAdmin, updateAdmin, getAdminById } = require("../controllers/admin");
const  { adminModel } = require("../models/admin")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { auth } = require("../authentication/auth");
const { adminRole } = require('../authentication/roles/admin');
const { createUser, getAllUsers, deleteUser } = require('../controllers/user');
const { createSeller, getAllSellers, deleteSeller } = require('../controllers/seller');
const { listOrders, changeOrder } = require('../Controllers/order')

const router = express();


router.post('/', async(req, res, next) => {
    try{
        const newAdmin = await createAdmin(req.body);
        console.log(newAdmin)
        res.json(newAdmin);

    }catch(error){

        res.status(401).send(error);
    }
})


router.patch("/", auth, adminRole, async function (req, res, next) {

 try {
    const myAccountId = req.userId
    const updatedInfo = req.body;
    const updatedAdmin = await updateAdmin(myAccountId, updatedInfo);
    res.json(updatedAdmin);
 } catch (err) {
    res.status(422).send(err);
 }

})


router.get("/", auth, adminRole, async function (req, res) {
 try {
    const id = req.userId;
    const myAccountInfo = await getAdminById(id);
    res.json(myAccountInfo);

 } catch (err) {
    res.status(422).send(err);
 }
});


router.post("/login", async function (req, res, next) {
 const { username, password } = req.body;
 const admin = await adminModel.findOne({ username: username})
 if (admin) {
   const validatePass = bcrypt.compareSync(password, admin.password);
   if (validatePass) {
     const token = jwt.sign({
       data: { username:username, userId: admin.id }
     }, process.env.SECRET, { expiresIn: '20d' });

     res.json(token)

   } else {
     res.status(401).json("Invalid credentials")
   }} else {
     res.status(401).json("Invalid credentials")
   }
 
 
})


router.post('/user/', auth, adminRole, async(req, res, next) => {
  try{
      const newUser = await createUser(req.body);
      console.log(newUser)
      res.json(newUser);
  }catch(error){
      res.status(401).send(error);
  }
})

router.delete('/user/:id', auth, adminRole, async (req, res) => {
  try {
      const id = req.params.id;
      const userToDelete = req.body;
      const deletedUser = await deleteUser(id, userToDelete);
      res.json(deletedUser);
  }catch (err) {
      res.status(500).send(err.message);
  }
})

router.get('/user/', auth, adminRole, async(req, res, next) => {
  try{
      const users = await getAllUsers();
      res.json(users);
   
  }catch(error){
      res.status(500).send(error.message);
  }
})

router.post('/seller/', auth, adminRole, async(req, res, next) => {
  try{
      const newSeller = await createSeller(req.body);
      console.log(newSeller)
      res.json(newSeller);
  }catch(error){
      res.status(401).send("error");
  }
})

router.delete('/seller/:id', auth, adminRole, async (req, res) => {
  try {
      const id = req.params.id;
      const sellerToDelete = req.body;
      const deletedSeller = await deleteSeller(id, sellerToDelete);
      res.json(deletedSeller);
  }catch (err) {
      res.status(500).send(err.message);
  }
})

router.get('/seller', auth, adminRole, async(req, res, next) => {
  try{
      const Seller = await getAllSellers(userId);
      res.json(Seller);
  }catch(error){
      res.status(500).send(error.message);
  }
})

router.get('/order', auth, adminRole, async (req, res) => {
  try {    
      const orders = await listOrders();
      res.json(orders);
  }catch (err) {
      res.status(500).send(err.message)
  }
})

router.patch('/order/:id', auth, adminRole, async(req, res, next) => {
  try{
      const id = req.params.id;
      const updatedOrder = await changeOrder(id, req.body);
      console.log(updatedOrder)
      res.json(updatedOrder);
  }catch(error){
      res.status(401).send("error");
  }
})

module.exports = router


