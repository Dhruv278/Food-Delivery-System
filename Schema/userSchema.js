const mongoose = require('mongoose');
const crypto = require('crypto');
const validate = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')


const UserSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Name must Require'],
        minlength: [2, 'minimum length of name is 2 '],


    },
    email: {
        type: String,
        required: [true, 'email is must require'],
        lowercase: true,
        unique: true,
        validate: [validate.isEmail, 'please enter the valid email'],
        validate: {
            validator: function (el) {
                return el.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)
            },
            message: 'please use gmail only'
        }

    },

    password: {
        type: String,
        required: true,
        minlength: [8, 'please enter the password of charecter 8'],

    },
    created_at: {
        type: Date,
        default: Date.now
    },
    city:{
        type:String,
        required:[true,'Enter city name']
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    orderHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }
    ]


});

UserSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);

    next()
});

// Return JSON Webtoken
UserSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWTSECRET, {
        expiresIn: process.env.EXPIRE_TIME
    })
}

// Check password for login
UserSchema.methods.comparePassword = async (enterpassword, userpassword) => {
    console.log(await bcrypt.compare(enterpassword, userpassword))
    return await bcrypt.compare(enterpassword, userpassword)

};




const User = mongoose.model('User', UserSchema);
module.exports = User;
