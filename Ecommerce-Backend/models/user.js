const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const timestamps = require('mongoose-timestamp');

const userSchema = mongoose.Schema({
    username: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    fullName: { type: 'string', required: true, unique: true, minLength: 3, maxLength: 25 },
    email: { type: 'string', required: true},
    phone: { type: 'number', required: true},
    orders: [{ type: [mongoose.Schema.ObjectId], ref: 'Order'}], // must be array
})

userSchema.plugin(timestamps);

userSchema.pre("save", function (next) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(this.password, salt);
    this.password = hash;

    next();
})

const userModel = mongoose.model('User', userSchema);
module.exports = { userModel };