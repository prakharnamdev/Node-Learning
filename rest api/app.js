const express = require('express'); //include express
const app = express(); //variable for express use

const studentroutes = require('./api/routes/student'); // include student.js
const facultyroutes = require('./api/routes/faculty');
const userroutes = require('./api/routes/user');

const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// mongoose.connect('mongodb+srv://Cluster1:Cluster1@cluster0.maise.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
mongoose.connect("mongodb://localhost:27017/EmployeeDB", { useNewUrlParser: true }, { useUnifiedTopology: true });
// mongoose.connect('mongodb+srv://Cluster1:Cluster1@cluster0.a7nn7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')

mongoose.connection.on('error', err => {
    console.log('Connection Fail...')
});

mongoose.connection.on('connected', connected => {
    console.log('Connect Successfully...')
});

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student', studentroutes); //first open page url
app.use('/faculty', facultyroutes);
app.use('/user', userroutes);

app.use((req, res, next) => {
    res.status(200).json({
        message:'app is running'
    })
})


app.use((req, res, next) => {
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app; 