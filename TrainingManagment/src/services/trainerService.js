const { successObject } = require('api-rsp');

const db = require('../models');
const Trainer = db.tbl_trainers;

class TrainerService {
    async getTrainer() {
        const result = await Trainer.findAll();
        return successObject({ result: result });
    }

    //get trainer by id
    async getTrainerById(id) {
        const result = await Trainer.findByPk(id);
        return successObject({ result: result });
    }

    //create trainer
    async createTrainer(data, url) {
        // console.log("req body in service ",req);
        const trainerData = {
            trainer_name: data.trainer_name,
            trainer_email: data.trainer_email,
            trainer_phone: data.trainer_phone,
            trainer_address: data.trainer_address,
            trainer_photo_url: url,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const result = await Trainer.create(trainerData);
        return successObject({ trainer: result });
    }

    //update trainer
    updateTrainer = (req) => {
        return new Promise(async (res, rej) => {
            await Trainer.update(
                { trainer_email: req.body.trainer_email },
                {
                    where: {
                        id: req.params.id,
                        is_active: true,
                    },
                }
            )
                .then((trainer) => {
                    console.log('trainer', trainer);
                    res(trainer);
                })
                .catch((err) => {
                    console.log(err);
                    rej(err);
                });
        });
    };

    //deleting trainer by id
    async deleteTrainer(id) {
        const result = await await Trainer.update(
            { is_active: false },
            {
                where: {
                    id: id,
                    is_active: true,
                },
            }
        );
        return successObject({ result: result });
    }
}

module.exports = TrainerService;
