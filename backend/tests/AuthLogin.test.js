const request = require('supertest');

const API = 'http://localhost:3000/shift-planner/api/v1';

describe('Login endpoint', () => {
    it('should login a user when provided with valid data', async () => {
        const requestBody = {
        email: 'gigi@gmail.com',
        password: '123456',
        };

        const res = await request(API)
        .post('/auth/login')
        .send(requestBody);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'User logged in successfully');
    });

    it('should raise error if user does not exist', async () => {
        const requestBody = {
        email: 'bbt@gmail.com',
        password: '234',
        };

        const res = await request(API)
        .post('/auth/login')
        .send(requestBody);

        expect(res.statusCode).toEqual(404);
        expect(res.body).toHaveProperty('error', 'User not found');

    });

        it('should raise error if password is incorrect', async () => {
            const requestBody = {
            email: 'gigi@gmail.com',
            password: '234',
            };

            const res = await request(API)
            .post('/auth/login')
            .send(requestBody);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('error', 'Invalid password');
        });



    });

   