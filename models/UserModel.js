const mongoose = require("mongoose");
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

// CREATING A BLOG MODEL
const User_Schema = new mongoose.Schema({

    RID: { type: String, required: true, unique: true, trim: true, minlength: 6, maxlength: 255 },
    password: { type: String, required: true, bcrypt: true, minlength: 8, maxlength: 1024 },
    firstName: { type: String, required: true , trim: true},
    lastName: { type: String, trim : true },
    branch: { type: String, required: true },
    userRole: {
        type: String,
        enum: ["Student" , "Admin"],
        default: "Student"
    },
    tasks : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tasks'
    }
});

// VALIDATING USER SCHEMA
function validateUser(user) {
    const schema = Joi.object({
        RID: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string(),
        branch: Joi.string().required(),
        password: Joi.string().required().min(6).max(1024),
        userRole: Joi.string(),
    });

    console.log("validating")

    return schema.validate(user);
}

User_Schema.methods.generateAuthToken = function(){
    const token = jwt.sign({ RID : this.RID, userRole : this.userRole}, config.get("jwtPrivateKey"))
    return token;
}

const User = new mongoose.model('users', User_Schema)

module.exports = {
    User,
    validateUser
}