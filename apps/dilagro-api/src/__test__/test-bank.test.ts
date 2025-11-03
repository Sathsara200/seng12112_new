/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // adjust path if needed

describe('Bank API Tests', () => {
  let client: AxiosInstance;
  let createdBankId: string;

  beforeAll(() => {
    client = createTestClient();
  });

  // ✅ Create a new bank
  it('should create a new bank', async () => {
    const newBank = {
      name: 'Commercial Bank',
      branchCode: 'CB001',
      branch: 'Colombo Main',
      branchAddress: '123 Galle Road, Colombo',
      contactNumber: '0112345678',
    };

    const response = await client.post('/bank', newBank);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.name).toBe(newBank.name);
    createdBankId = response.data._id;
  });

  // ❌ Invalid name type
  it('should not create a bank with invalid name type', async () => {
    const invalidBank = {
      name: 12345,
      branchCode: 'BC002',
      branch: 'Negombo',
      branchAddress: 'Some address',
      contactNumber: '0771234567',
    };

    const response = await client.post('/bank', invalidBank).catch((err) => err.response);

    expect(response.status).toBe(400);
    expect(response.data.message).toBeDefined();
  });

  // ✅ Get all banks
  it('should retrieve all banks', async () => {
    const response = await client.get('/bank');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
  });

    // ✅ Get bank by ID
it('should create and then retrieve a bank by ID', async () => {
  const newBank = {
    name: 'Commercial Bank',
    branchCode: 'CB001',
    branch: 'Colombo Main',
    branchAddress: '123 Galle Road, Colombo',
    contactNumber: '0112345678',
  };

  // ✅ Step 1: Create a bank
  const createResponse = await client.post('/bank', newBank);
  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.name).toBe(newBank.name);

  const createdBankId = createResponse.data._id;

  // ✅ Step 2: Retrieve the created bank by ID
  const getResponse = await client.get(`/bank/${createdBankId}`);
  expect(getResponse.status).toBe(200);
  expect(getResponse.data._id).toBe(createdBankId);
  expect(getResponse.data.name).toBe('Commercial Bank');
});

// ✅ Update a bank
it('should update a bank name', async () => {
  // 1️⃣ Create a new bank first
  const newBank = {
    name: 'Commercial Bank',
    branchCode: 'CB001',
    branch: 'Colombo Main',
    branchAddress: '123 Galle Road, Colombo',
    contactNumber: '0112345678',
  };

  const createResponse = await client.post('/bank', newBank);

  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.name).toBe(newBank.name);

  const createdBankId = createResponse.data._id;

  // 2️⃣ Update the bank
  const updatedBank = { name: 'Updated Commercial Bank' };
  const updateResponse = await client.patch(`/bank/${createdBankId}`, updatedBank);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data.name).toBe(updatedBank.name);
});


// ✅ Delete a bank
it('should delete a bank', async () => {
  // 1️⃣ Create a new bank first
  const newBank = {
    name: 'Commercial Bank',
    branchCode: 'CB001',
    branch: 'Colombo Main',
    branchAddress: '123 Galle Road, Colombo',
    contactNumber: '0112345678',
  };

  const createResponse = await client.post('/bank', newBank);
  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.name).toBe(newBank.name);

  const createdBankId = createResponse.data._id;

  // 2️⃣ Delete the created bank
  const deleteResponse = await client.delete(`/bank/${createdBankId}`);
  expect(deleteResponse.status).toBe(200);
});

});