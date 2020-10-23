const supertest = require('supertest');
const app = require('../src/app')();

describe('Post Endpoints', () => {
    beforeAll(async () => {
        console.log('testing test');
    });

    it('should get all trainers', async () => {
        const res = await supertest(app).get('/api/v1.0/trainers');
        console.log('res', res.body.data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    it('should get perticular trainers', async () => {
        const res = await supertest(app).get('/api/v1.0/trainers/2');
        console.log('res', res.body.data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    it('should create a new post', async () => {
        const res = await supertest(app)
            .post('/api/v1.0/trainers')
            .field('trainer_name', 'sapana')
            .field('trainer_email', 'sapana12.v@gmail.com')
            .field('trainer_phone', '9011779907')
            .field('trainer_address', 'pune')
            .attach('file', 'uploads/taskER-2.png');
        console.log('res', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Success');
    }, 10000);

    it('should update  a  trainer', async () => {
        const res = await supertest(app)
            .put('/api/v1.0/trainers/3')
            .field('trainer_name', 'aiwn')
            .field('trainer_email', 'sapana12.v@gmail.com')
            .field('trainer_phone', '9011779907')
            .field('trainer_address', 'banglore')
            .attach('file', 'uploads/taskER-2.png');
        console.log('res', res.body);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    it('should delete perticular trainers', async () => {
        const res = await supertest(app).delete('/api/v1.0/trainers/3');
        console.log('res', res.body.data);
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Success');
    });

    afterAll((done) => {
        done();
    });
});
