const { userModel } = require('../../models/user') 

async function userRole(req, res, next) {
    const user = await userModel.findById(req.userId);
    console.log(user);
    if (user != null) {
        next();
    }else{
        res.status(403).send("Not Auhtorized user");
    }   
}

module.exports = { userRole };