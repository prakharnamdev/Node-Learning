const express = require('express');
const router = express.Router();
const mongooses = require('mongoose');
const User = require('../model/user');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

router.post('/', (req, res, next) => {
    bcrypt.hash(req.body.password,10, (err, hash) => {
        if(err) {
            return res.status(500).json({
                error:err
            })
        } else {
            const user = new User({
                _id: new mongooses.Types.ObjectId,
                username:req.body.username,
                password:hash,
                phone:req.body.phone,
                email:req.body.email,
                usertype:req.body.usertype
            })

            user.save()
            .then(result =>{
                res.status(200).json({
                    newuser:result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error:err
                })
            })
        }
    })
})

module.exports = router;