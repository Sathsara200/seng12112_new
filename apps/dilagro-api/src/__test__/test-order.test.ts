/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // Adjust path to your test client helper

describe('Order API Tests', () => {
  let client: AxiosInstance;
  let createdOrderId: string;

  beforeAll(() => {
    client = createTestClient();
  });

  // ✅ 1. Create a new order
  it('should create a new order', async () => {
    const newOrder = {
      customerId: '12345',
      productId: '67890',
      quantity: 2,
      totalPrice: 1000,
    };

    const response = await client.post('/order', newOrder);

    expect(response.status).toBe(201);
    expect(response.data).toHaveProperty('_id');
    expect(response.data.customerId).toBe(newOrder.customerId);
    expect(response.data.productId).toBe(newOrder.productId);
    expect(response.data.quantity).toBe(newOrder.quantity);

    createdOrderId = response.data._id;
    console.log('Created Order ID:', createdOrderId);
  });

  // ✅ 2. Retrieve all orders
  it('should retrieve all orders', async () => {
    const response = await client.get('/order');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  // ✅ 3. Retrieve order by ID
it('should retrieve an order by ID', async () => {
  // 1️⃣ Create a new order first
  const newOrder = {
    customerId: '12345',
    productId: '67890',
    quantity: 2,
    totalPrice: 1000,
  };

  const createResponse = await client.post('/order', newOrder);

  // Validate creation
  expect(createResponse.status).toBe(201);
  expect(createResponse.data).toHaveProperty('_id');
  expect(createResponse.data.customerId).toBe(newOrder.customerId);
  expect(createResponse.data.productId).toBe(newOrder.productId);

  const createdOrderId = createResponse.data._id;
  console.log('Created Order ID:', createdOrderId);

  // 2️⃣ Retrieve the order by ID
  const getResponse = await client.get(`/order/${createdOrderId}`);

  expect(getResponse.status).toBe(200);
  expect(getResponse.data._id.toString()).toBe(createdOrderId.toString());
  expect(getResponse.data.customerId).toBe(newOrder.customerId);
  expect(getResponse.data.productId).toBe(newOrder.productId);
  expect(getResponse.data.quantity).toBe(newOrder.quantity);
});

  // ✅ 4. Update order
it('should update an order', async () => {
  // 1️⃣ Create a new order first
  const newOrder = {
    customerId: '12345',
    productId: '67890',
    quantity: 2,
    totalPrice: 1000,
    status: 'shipped',
  };

  const createResponse = await client.post('/order', newOrder);
  expect(createResponse.status).toBe(201);

  const createdOrderId = createResponse.data._id;
  console.log('Created Order ID for update:', createdOrderId);

  // 2️⃣ Update the created order
  const updatedOrder = { quantity: 5, status: 'shipped' };
  const updateResponse = await client.patch(`/order/${createdOrderId}`, updatedOrder);

  expect(updateResponse.status).toBe(200);
  expect(updateResponse.data.quantity).toBe(updatedOrder.quantity);
  expect(updateResponse.data.status).toBe(updatedOrder.status);
});


  // ✅ 5. Delete order
it('should delete an order', async () => {
  // 1️⃣ Create a new order first
  const newOrder = {
    customerId: '12345',
    productId: '67890',
    quantity: 2,
    totalPrice: 1000,
  };

  const createResponse = await client.post('/order', newOrder);
  expect(createResponse.status).toBe(201);

  const createdOrderId = createResponse.data._id;
  console.log('Created Order ID for deletion:', createdOrderId);

  // 2️⃣ Delete the created order
  const deleteResponse = await client.delete(`/order/${createdOrderId}`);
  expect(deleteResponse.status).toBe(200);

  // 3️⃣ Verify deletion
  try {
    await client.get(`/order/${createdOrderId}`);
  } catch (err: any) {
    expect(err.response.status).toBe(404);
  }
});


  // ❌ 6. Invalid order creation (missing required fields)
  it('should not create an order with missing required fields', async () => {
    const invalidOrder = { quantity: 2 }; // Missing customerId, productId, totalPrice

    const response = await client.post('/order', invalidOrder);

    expect(response.status).toBe(400);
    console.log('Invalid Create Response:', response.data);
  });

  // ❌ 7. Invalid order creation (negative quantity)
  it('should not create an order with negative quantity', async () => {
    const invalidOrder = {
      customerId: '12345',
      productId: '67890',
      quantity: -3,
      totalPrice: 500,
    };

    const response = await client.post('/order', invalidOrder);

    expect(response.status).toBe(400);
    console.log('Invalid Quantity Response:', response.data);
  });
});
