const express = require('express');
const app = express();
const trainerController = require('../controllers/trainerConn');
const multer = require('multer');
const fs = require('fs');
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        console.log("filename",file.originalname);
        callback(null, file.originalname);
    }
});
var upload = multer({storage: storage});
app.get('/api/v1.0/trainers',trainerController.getTrainers);
app.get('/api/v1.0/trainers/:id',trainerController.getTrainersById);
app.post('/api/v1.0/trainers',upload.single('file'),trainerController.signUp );
app.put('/api/v1.0/trainers/:id',trainerController.trainerUpdate);  
app.delete('/api/v1.0/trainers/:id',trainerController.trainerDelete);

module.exports = app;