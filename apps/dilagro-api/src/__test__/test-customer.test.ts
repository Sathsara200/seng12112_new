/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // Adjust path to your test client

describe('Customer API Tests', () => {
  let client: AxiosInstance;
  let createdCustomerId: string;

  beforeAll(() => {
    client = createTestClient(); // Your Axios test client pointing to Nest app
  });

  // ✅ Create a new customer
  it('should create a new customer', async () => {
    const newCustomer = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phoneNumber: '0112345678',
    };

    const response = await client.post('/customer', newCustomer);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.firstName).toBe(newCustomer.firstName);
  });

  // ✅ Retrieve all customers
  it('should retrieve all customers', async () => {
    const response = await client.get('/customer');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

 // ✅ Retrieve a customer by ID
it('should retrieve a customer by ID', async () => {
  const newCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example2.com',
    phoneNumber: '0112345678',
  };

  // Create a new customer first
  const createResponse = await client.post('/customer', newCustomer);

  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.firstName).toBe(newCustomer.firstName);

  const createdCustomerId = createResponse.data._id;

  // Retrieve the customer by ID
  const getResponse = await client.get(`/customer/${createdCustomerId}`);

  expect(getResponse.status).toBe(200);
  expect(getResponse.data._id.toString()).toBe(createdCustomerId.toString());
  expect(getResponse.data.firstName).toBeDefined();
});


// ✅ Update a customer
it('should update a customer', async () => {
  // Create a new customer
  const newCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe.${Date.now()}@example.com`, // unique email each run
    phoneNumber: '0112345678',
  };

  const createResponse = await client.post('/customer', newCustomer);

  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.firstName).toBe(newCustomer.firstName);

  // Extract the newly created customer's ID
  const createdCustomerId = createResponse.data._id;

  // Prepare the update
  const updatedCustomer = { firstName: 'Jane' };

  // Send PATCH request to update the customer
  const updateResponse = await client.patch(`/customer/${createdCustomerId}`, updatedCustomer);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data.firstName).toBe(updatedCustomer.firstName);
});


  // ✅ Delete a customer
it('should delete a customer', async () => {
  // Step 1: Create a new customer to delete
  const newCustomer = {
    firstName: 'John',
    lastName: 'Doe',
    email: `john.doe.${Date.now()}@example.com`, // ensures unique email
    phoneNumber: '0112345678',
  };

  const createResponse = await client.post('/customer', newCustomer);
  expect(createResponse.status).toBe(201);
  const createdCustomerId = createResponse.data._id;

  // Step 2: Delete the customer
  const deleteResponse = await client.delete(`/customer/${createdCustomerId}`);
  expect(deleteResponse.status).toBe(200);
});

  // ❌ Invalid customer creation
  it('should not create a customer with invalid email', async () => {
    const newCustomer = {
      firstName: 'Invalid',
      lastName: 'User',
      email: 'not-an-email',
    };

    const response = await client.post('/customer', newCustomer).catch(err => err.response);
    expect(response.status).toBe(400);
  });
});
