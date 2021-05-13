const express = require('express');
const {addStudent, getAllStudent, getStudent, updateStudent, delseteStudent} = require('../controllers/studentController');

const router = express.Router();

router.post('/student', addStudent);
router.get('/getallstudent', getAllStudent);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', delseteStudent)

module.exports = {
    routes:router
}