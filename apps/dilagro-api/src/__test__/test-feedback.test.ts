/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // adjust path

describe('Feedback API Tests', () => {
  let client: AxiosInstance;
  let createdFeedbackId: string;

  beforeAll(() => {
    client = createTestClient();
  });

  it('should create a feedback', async () => {
    const newFeedback = {
      customerId: '12345',
      message: 'Great service!',
      rating: 5,
    };

    const response = await client.post('/feedback', newFeedback);
    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');

    createdFeedbackId = response.data._id;
  });
it('should get feedback by ID', async () => {
  // 1️⃣ Create a new feedback
  const newFeedback = {
    customerId: '12345',
    message: 'Great service!',
    rating: 5,
  };

  const createResponse = await client.post('/feedback', newFeedback);
  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');

  createdFeedbackId = createResponse.data._id;

  // 2️⃣ Retrieve the feedback by ID
  const getResponse = await client.get(`/feedback/${createdFeedbackId}`);
  expect(getResponse.status).toBe(200);

  // Ensure _id matches and other properties are correct
  expect(getResponse.data._id.toString()).toBe(createdFeedbackId.toString());
  expect(getResponse.data.customerId).toBe(newFeedback.customerId);
  expect(getResponse.data.message).toBe(newFeedback.message);
  expect(getResponse.data.rating).toBe(newFeedback.rating);
});


it('should update feedback', async () => {
  // 1️⃣ Create a new feedback first
  const newFeedback = {
    customerId: '12345',
    message: 'Great service!',
    rating: 5,
  };

  const createResponse = await client.post('/feedback', newFeedback);
  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');

  const createdFeedbackId = createResponse.data._id;

  // 2️⃣ Update the created feedback
  const updated = { message: 'Good service', rating: 4 };
  const updateResponse = await client.patch(`/feedback/${createdFeedbackId}`, updated);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data.message).toBe(updated.message);
  expect(updateResponse.data.rating).toBe(updated.rating);
  expect(updateResponse.data._id.toString()).toBe(createdFeedbackId.toString());
});


it('should delete feedback', async () => {
  // 1️⃣ Create a new feedback first
  const newFeedback = {
    customerId: '12345',
    message: 'Service to delete',
    rating: 3,
  };

  const createResponse = await client.post('/feedback', newFeedback);
  expect(createResponse.status).toBe(201);
  const createdFeedbackId = createResponse.data._id;

  // 2️⃣ Delete the feedback
  const deleteResponse = await client.delete(`/feedback/${createdFeedbackId}`);
  expect(deleteResponse.status).toBe(200);

  // 3️⃣ Verify deletion
  try {
    await client.get(`/feedback/${createdFeedbackId}`);
  } catch (err) {
    expect(err.response.status).toBe(404);
  }
});

});
