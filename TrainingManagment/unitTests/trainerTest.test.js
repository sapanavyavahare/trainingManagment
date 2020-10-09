const request = require('supertest');
const app = require('../src/index');
describe('Post Endpoints', () => {
    it('should create a new post', async () => {
        const res = await request(app).get('');
        expect(res.code).toEqual(200);
        console.log('array', res.data);
    });
});
