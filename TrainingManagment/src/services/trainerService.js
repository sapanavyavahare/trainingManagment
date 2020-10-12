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
    async updateTrainer(id, dbData, url) {
        const result = await Trainer.update(
            {
                trainer_name: dbData.trainer_name,
                trainer_email: dbData.trainer_email,
                trainer_phone: dbData.trainer_phone,
                trainer_address: dbData.trainer_address,
                trainer_photo_url: url,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                where: {
                    id: id,
                    is_active: true,
                },
            }
        );
        return successObject({ result: result });
    }

    //deleting trainer by id
    async deleteTrainer(id) {
        const result = await Trainer.update(
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
