const request = require('supertest');
const API = 'http://localhost:3000'; // Update with your API endpoint

describe('Confirmation endpoint', () => {
  it('should confirm the email and return success message', async () => {
    // Create a user or get a user with a valid confirmation token from your database
    const userWithValidToken = {
      // Define the user details with a valid confirmation token
      name: 'Moussa',
      email: 'm.moussa@alustudent.com',
      password: 'Kakay10',
      confirmationToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJtLm1vdXNzYUBhbHVzdHVkZW50LmNvbSIsImlhdCI6MTY5NzAzOTMxNywiZXhwIjoxNjk3NDcxMzE3fQ.4rFrdMVytVr6oTYIYXQpHHTKkfBMLMxMANTa7d5INeY', // Replace with a valid token
    };

    // Save the user with the valid token to the database

    const res = await request(API)
      .get(`/shift-planner/api/v1/auth/confirm-email?token=${userWithValidToken.confirmationToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Email confirmed successfully');
  });

  it('should raise an error for an invalid confirmation token', async () => {
    // Use an invalid confirmation token
    const invalidToken = 'invalid_token';

    const res = await request(API)
      .get(`/shift-planner/api/v1/auth/confirm-email?token=${invalidToken}`);

    expect(res.statusCode).toEqual(400);
    expect(res.text).toEqual('Invalid confirmation token');
  });


});
