const supertest = require('supertest');
const app = require('../src/app');
const models = require('../src/models');
const { TrainerService } = require('../src/services');
const trainerService = new TrainerService();
describe('Post Endpoints', () => {
    beforeAll(async () => {
        console.log('testing test');
    });

    it('should get all trainers', async () => {
        const res = await supertest(app).get('').expect(200);
        expect(res.body).toMatchObject({
            success: true,
        });
    });
    afterAll((done) => {
        done();
    });

    // it('should create a new post', async () => {
    //     const data = {
    //         trainer_name: 'abc',
    //         trainer_email: 'sapana12.v@gmail.com',
    //         trainer_phone: '9011779907',
    //         trainer_address: 'pune',
    //     };
    //     const url =
    //         'https://training-managent-bucket-sapna.s3.amazonaws.com/task1ER.png';
    //     const res = await trainerService.createTrainer(data, url);
    //     expect(res.code).toEqual(200);
    //     console.log('array', res);
    // });
});
