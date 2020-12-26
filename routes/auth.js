const express = require("express");
const router = express.Router();
const { User, validateUser } = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')

// CREATING A NEW USER
router.post('/register', async (req, res) => {
    try {
        // validating user
        const { error } = validateUser(req.body);
        // console.log("validation done")
        if (error) return res.status(400).json({
            msg : "Validation Falied",
            error : error.details[0].message
        });
        // checking duplicate user
        const RID = req.body.RID;
        let user = await User.findOne({ RID })
        if (user) { return res.json({ msg: "Sorry, User Exists", registered : false }); }
        else {
            user = new User(_.pick(req.body, ['firstName', 'lastName', 'branch','RID', 'password', 'userRole']));
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
            const result = await user.save();           
            // const token = user.generateAuthToken();
            res.status(200).json({
                msg: "You have registered Successfully..",
                registered : true,
                result
            });
        }
    } catch (error) {
        res.send(error)
    }
});

// LOGGIN USER IN
router.post('/login', async (req, res) => {
    try {
        // validating user
        // console.log("Validating")
        // console.log(req.body)
        const { error } = validateCredentials(req.body);        
        if (error) return res.json({
            msg : "Please Enter valid Credentials",
            allowed : false,
            error : error.details[0].message
        });
        console.log("Validated")
        // looking for user
        const RID = req.body.RID;
        let user = await User.findOne({ RID })
        if (!user) { return res.json({
             msg: "Invalid Credentials!" ,
             allowed : false,             
            });
        }
        else {
            // checking password
            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) return res.json({
                msg: "Invalid Password",
                allowed : false,             
               });
            const token = user.generateAuthToken();
            res.status(200).json({
                msg : "LoggedIn Successfully..",
                allowed : true,
                token
            });
        }
    } catch (error) {
        res.send(error)
    }
});

router.get('/getCurrentUser', async (req, res) => {
    try {
        const token = req.header("x-auth-token");
        console.log("TOKEN  ::" , token)
        if (!token) return res.status(401).json({ msg: "Access denied, No token provided.", allowed : false });
        try {             
            let decoded = jwt.verify(token, config.get('jwtPrivateKey'));
            console.log(decoded)
            // checking duplicate user 
            decoded = await User.findOne({RID : decoded.RID})
                                .select('-tasks -__v');
            if(decoded) {
                res.json({
                    msg : `user Found with username ${decoded.username}`,
                    allowed : true,
                    decoded
                })
            }
            else{
                res.json({
                    msg : `Sorry, User Not Found`,
                    allowed : false                    
                })
            }
        } catch (error) {
            res.send(error)
        }
    } catch (error) {
            res.status(400).json({msg : "Invalid token.",error,allowed : false})
    }
});


// VALIDATING USER SCHEMA
function validateCredentials(credentials) {
    const schema = Joi.object({
        RID: Joi.string().required().min(6).max(255),
        password: Joi.string().required().min(6).max(1024),
    });

    return schema.validate(credentials);
}

module.exports = router;
