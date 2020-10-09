const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const { TrainerController } = require('../controllers');
const trainerController = new TrainerController();

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = './uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        console.log('filename', file.originalname);
        callback(null, file.originalname);
    },
});
var upload = multer({ storage: storage });
router.get('', trainerController.getTrainers);
router.get('/:id', trainerController.getTrainersById);
router.post('', upload.single('file'), trainerController.signUp);
router.put('/:id', trainerController.trainerUpdate);
router.delete('/:id', trainerController.trainerDelete);

module.exports = router;
