const request = require('supertest');
const API = 'http://localhost:3000/shift-planner/api/v1'; // Replace with your API endpoint

describe('DepartmentController', () => {
  let newDepartmentId = '';

  it('should create a new department', async () => {
    const requestBody = {
      name: 'Test Department',
      companyId: 1, // Replace with a valid company ID
    };

    const res = await request(API)
      .post('/departments')
      .send(requestBody);

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('name', requestBody.name);
    expect(res.body).toHaveProperty('companyId', requestBody.companyId);

    newDepartmentId = res.body.id; // Store the department ID for later tests
  });

  it('should get all departments', async () => {
    const res = await request(API)
      .get('/departments');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should get a specific department by ID', async () => {
    const res = await request(API)
      .get(`/departments/${newDepartmentId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('id', newDepartmentId);
  });

  it('should update a department by ID', async () => {
    const updatedDepartment = {
      name: 'Updated Department',
      companyId: 2, // Replace with a valid company ID
    };

    const res = await request(API)
      .put(`/departments/${newDepartmentId}`)
      .send(updatedDepartment);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('name', updatedDepartment.name);
    expect(res.body).toHaveProperty('companyId', updatedDepartment.companyId);
  });

  it('should delete a department by ID', async () => {
    const res = await request(API)
      .delete(`/departments/${newDepartmentId}`);

    expect(res.statusCode).toEqual(204);
  });
});
