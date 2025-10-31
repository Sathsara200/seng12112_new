/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // adjust import path if needed

describe('City API Tests', () => {
  let client: AxiosInstance;
  let createdCityId: string;

  beforeAll(() => {
    client = createTestClient();
  });


it('should create a new city', async () => {
  const newCity = { name: 'colombo'};

  const response = await client.post('/city', newCity);

  // Expect status 201 Created
  expect(response.status).toBe(201);
  console.log('Response Data:', response.data);

  //Store the created city's ID for later tests
  createdCityId = response.data._id;
  console.log('Created City ID:', createdCityId);

  // Check response body
  expect(response.data).toHaveProperty('_id');
  expect(response.data.name).toBe(newCity.name);
});


    // ✅ 2. Get all cities
it('should retrieve all cities', async () => {
  const response = await client.get('/city');

  expect(response.status).toBe(200);
  expect(Array.isArray(response.data)).toBe(true);
  expect(response.data.length).toBeGreaterThan(0);
});

  // ✅ 3. Get a city by ID
it('should retrieve a city by ID', async () => {
  const newCity = { name: 'Colombo' };

  // Create a new city
  const createResponse = await client.post('/city', newCity);
  expect(createResponse.status).toBe(201);

  createdCityId = createResponse.data._id; // Support either field name
  console.log('Created City ID:', createdCityId);

  // Verify creation response
  expect(createdCityId).toBeDefined();
  expect(createResponse.data.name).toBe(newCity.name);

  // Retrieve the created city
  const getResponse = await client.get(`/city/${createdCityId}`);
  expect(getResponse.status).toBe(200);
  expect(getResponse.data._id.toString()).toBe(createdCityId.toString());
  expect(getResponse.data.name).toBe('Colombo');
});

 // ✅ 4. Update a city
it('should update a city name', async () => {
  // Create a new city first
  const newCity = { name: 'Colombo' };
  const createResponse = await client.post('/city', newCity);

  // Expect status 201 Created
  expect(createResponse.status).toBe(201);

  // Store the created city's ID (support both `id` and `_id`)
  createdCityId = createResponse.data._id;
  console.log('Created City ID:', createdCityId);

  // Check response body
  expect(createdCityId).toBeDefined();
  expect(createResponse.data.name).toBe(newCity.name);

  // Update the created city
  const updatedCity = { name: 'New Colombo' };
  const updateResponse = await client.patch(`/city/${createdCityId}`, updatedCity);

  // Validate update
  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data).toHaveProperty('name', updatedCity.name);
});


// ✅ 5. Delete a city
it('should delete a city', async () => {
  // Create a new city first
  const newCity = { name: 'Colombo' };
  const createResponse = await client.post('/city', newCity);

  // Expect status 201 Created
  expect(createResponse.status).toBe(201);

  // Store the created city's ID (support both `_id` and `id`)
  createdCityId = createResponse.data._id;
  console.log('Created City ID:', createdCityId);

  // Check response body
  expect(createdCityId).toBeDefined();
  expect(createResponse.data.name).toBe(newCity.name);

  // Delete the created city
  const deleteResponse = await client.delete(`/city/${createdCityId}`);

  // Validate delete
  expect(deleteResponse.status).toBe(200);

  // Optionally verify that the city no longer exists
  try {
    await client.get(`/city/${createdCityId}`);
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

it('should not create a new city', async () => {
  const newCity = { name: 12345};

  const response = await client.post('/city', newCity);

  // Expect status 400 Created
  expect(response.status).toBe(400);
  console.log('Response Data:', response.data);
  console.log('Response Status:', response.data.statusCode);
  console.log('Response Message:', response.data.message);

});


it('should not create a new city', async () => {
  const newCity = { name: ''};

  const response = await client.post('/city', newCity);

  // Expect status 400 Created
  expect(response.status).toBe(400);
  console.log('Response Data:', response.data);
  console.log('Response Status:', response.data.statusCode);
  console.log('Response Message:', response.data.message);

});

it('should not create a new city', async () => {
  const newCity = { name: 'sassssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss'};

  const response = await client.post('/city', newCity);

  // Expect status 400 Created
  expect(response.status).toBe(400);
  console.log('Response Data:', response.data);
  console.log('Response Status:', response.data.statusCode);
  console.log('Response Message:', response.data.message);

});



});