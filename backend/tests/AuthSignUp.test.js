const request = require('supertest');

const API = 'http://localhost:3000';

describe('Signup endpoint', () => {
  it('should create a new user when provided with valid data', async () => {
    const requestBody = {
      name: 'Amina',
      email: 'amina212@test.com',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'User signed up successfully. Check your email for confirmation.');
  });

  it('should raise error if user already existed', async () => {
    const requestBody = {
      name: 'Aman',
      email: 'amanw@test.com',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(403);
    expect(res.body).toHaveProperty('message', 'User already exists');
  });

  it('should raise error when name is empty', async () => {
    const requestBody = {
      name: '',
      email: 'example@test.com',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Name cannot be empty');
  });

  it('should raise an error when "name" is not a string', async () => {
    const requestBody = {
      name: 123,
      email: 'aman@test.com',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Name should be a string');
  });

  it('should raise an error when "name" is missing in the request', async () => {
    const requestBody = {
      email: 'testuser@example.com',
      password: 'password123',
    };

    const response = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty('message', 'Name is a required field');
  });

  it('should raise an error when "email" is missing in the request', async () => {
    const requestBody = {
      name: 'Aman',
      password: '123456',
    };

    const response = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty(
      'message',
      'Email is a required field',
    );
  });

  it('should raise an error when "email" is not valid', async () => {
    const requestBody = {
      name: 'Aman',
      email: 'amantest.com',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'message',
      'Email must be a valid email address',
    );
  });

  it('should raise error when email is empty', async () => {
    const requestBody = {
      name: 'Aman',
      email: '',
      password: '123456',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Email cannot be empty');
  });

  it('should raise an error when "password" is missing in the request', async () => {
    const requestBody = {
      name: 'Aman',
      email: 'testuser@example.com',
    };

    const response = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(response.statusCode).toEqual(400);
    expect(response.body).toHaveProperty(
      'message',
      'Password is a required field',
    );
  });

  it('should raise error when password is empty', async () => {
    const requestBody = {
      name: 'Aman',
      email: 'test@test.com',
      password: '',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message', 'Password cannot be empty');
  });

  it('should raise error for a password with less than 6 characters', async () => {
    const requestBody = {
      name: 'Aman',
      email: 'test@test.com',
      password: '123',
    };

    const res = await request(API)
      .post('/shift-planner/api/v1/auth/signup')
      .send(requestBody);

    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty(
      'message',
      'Password should have a minimum length of 6',
    );
  });
});
