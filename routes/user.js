const express = require("express");
const router = express.Router();
const { User, validateUser } = require('../models/UserModel');
// const bcrypt = require('bcryptjs');
// const Joi = require('joi');
const jwt = require('jsonwebtoken')
const config = require('config')
const _ = require('lodash')

// GETTING THE LOGGED IN USER INFO WITH TOKEN
// USING THE QUERY PARAMETER
router.get('/search', async (req,res)=>{
    try {
      let user = await User.find({$or : [req.query]})
      if(!user) return res.json({msg : "Couldn't Find the Tasks.. Try Again"}); 
      res.json({
        msg : "User(s) Found",
        user
      })
  
    } catch (error) {
        res.send(error)
    }
  });

module.exports = router;
