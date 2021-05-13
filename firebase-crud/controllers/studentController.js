'use strict';

const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();

const addStudent = async (req, res, next) => {
    try{
        const data =req.body;
        await firestore.collection('students').doc().set(data);
        res.send('Record save succcessfuly')
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllStudent = async (req, res, next) => {
    try {
        const student = await firestore.collection('students');
        const data = await student.get();
        const studentsArray = [];
        if (data.empty) {
            res.status(404).send('no student record found');
        } else {
            data.forEach(doc => {
                const student = new Student(
                    doc.id,
                    doc.data().firstName,
                    doc.data().lastName,
                    doc.data().fatherName,
                    doc.data().classEnrolled,
                    doc.data().age,
                    doc.data().phoneNumber,
                    doc.data().subject,
                    doc.data().year,
                    doc.data().semester,
                    doc.data().status,
                );
                studentsArray.push(student);
            })
            res.send(studentsArray)
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('students').doc(id);
        const data = await student.get();
        if (!data.exists) {
            res.status(404).send('Student with the given id not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const student = await firestore.collection('students').doc(id);
        await student.update(data);
        res.send('Student record update succcessfuly');
    } catch (error) {
        res.send(400).send(error.message);
    }
}

const delseteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('students').doc(id).delete();
        res.send('Recode delete successfuly');
    } catch (error) {
        res.status(404).send(error.message);
    }
}

module.exports = {
    addStudent,
    getAllStudent,
    getStudent,
    updateStudent,
    delseteStudent
}