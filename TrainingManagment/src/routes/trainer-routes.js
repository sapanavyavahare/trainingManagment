const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('../../swagger.json');

const { TrainerController } = require('../controllers');
const { TrainerSchema } = require('../validation-schema');
const { AuthController } = require('../controllers');
const authmiddleware = require('../middlewares/authMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const trainerController = new TrainerController();
const trainerSchema = new TrainerSchema();
const authController = new AuthController();

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

router.get('', authMiddleware.Validate, trainerController.getTrainers);
router.get('/:id', authMiddleware.Validate, trainerController.getTrainersById);
router.post(
    '',
    upload.single('file'),
    authmiddleware.Validate,
    trainerController.signUp
);
router.post('/register', authController.register);
router.post('/confirmCode', authController.confirmCode);
router.post('/login', authController.signIn);
router.post(
    '/validate',
    authmiddleware.Validate,
    trainerController.getTrainers
);
router.put(
    '/:id',
    upload.single('file'),
    authMiddleware.Validate,
    trainerController.trainerUpdate
);
router.delete('/:id', authMiddleware.Validate, trainerController.trainerDelete);
router.post(
    '/trainertopic',
    upload.single('file'),
    authmiddleware.Validate,
    trainerController.addTrainer
);

router.get(
    '/trainersByTopic/:id',
    authmiddleware.Validate,
    trainerController.getTrainerBYTopic
);

router.get(
    '/trainerSchedule/:id',
    authmiddleware.Validate,
    trainerController.getTrainerSchedules
);
router.post(
    '/trainerStatistics/:id',
    authmiddleware.Validate,
    trainerController.trainerStatistics
);

router.post(
    '/trainerAvaliable/:id',
    authmiddleware.Validate,
    trainerController.getFreeTrainers
);

router.post(
    '/trainerAvaliableForTopic/:id',
    authmiddleware.Validate,
    trainerController.getFreeTrainersForTopic
);
router.post(
    '/trainingProgram',
    authmiddleware.Validate,
    trainerController.signUpTrainingProgram
);

router.post(
    '/trainingList',
    authmiddleware.Validate,
    trainerController.trainingList
);

module.exports = router;
