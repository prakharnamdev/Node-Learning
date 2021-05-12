const express = require('express');
const router = express.Router();
const Student = require('../model/student');
const mongoose = require('mongoose');
const { route } = require('./faculty');

//get request & retrive all data
router.get('/', (req, res, next) => {
    Student.find()
    .then(result => {
        res.status(200).json({
            studentData:result
        })
    })
    // res.status(200).json({
    //     msg:'this is student get request'
    // })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//get request & retrive one data
router.get('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            student:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

//post request
router.post('/', (req, res, next) => {
    const student = new Student({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        gender:req.body.gender
    })

    student.save()
    .then(result => {
        console.log(result);
        res.status(200).json({
            newStudent:result
        })
    })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
    // res.status(200).json({
    //     msg:'this is student post request'
    // })
    // console.log(req.body); //for all value in console
    // console.log(req.body.name); //for one value in console

})

//delete request
router.delete('/:id', (req, res, next) => {
    Student.remove({ _id:req.params.id })
    .then(result => {
        res.status(200).json({
            message:'Student Delete Successfull...',
            result:result
        })
    })
    .catch(err => {
        res.status(500).json({
            error:err
        })
    })
})

//update request
router.put('/:id', (req, res, next) => {
    console.log(req.params.id);
    Student.findOneAndUpdate({ _id:req.params.id}, {
        $set:{
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            gender:req.body.gender
        }
    })
    .then(result => {
        res.status(200).json({
            updated:result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

module.exports = router;