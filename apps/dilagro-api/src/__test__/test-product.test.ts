/// <reference types="jest" />
import { AxiosInstance } from 'axios';
import { createTestClient } from './test-client'; // ✅ helper for axios instance

describe('Product API Tests', () => {
  let client: AxiosInstance;
  let createdProductId: string;

  beforeAll(() => {
    client = createTestClient();
  });

  // ✅ 1. Create a new product
  it('should create a new product', async () => {
  const newProduct = {
    name: 'Laptop',
    description: 'High performance laptop',
    price: 2000, // must be number, not string
    stock: 10,
  };

  const response = await client.post('/product', newProduct);

  console.log('Response:', response.data); // 👈 add this for debugging

  expect(response.status).toBe(201);
  expect(response.data).toHaveProperty('_id');
  expect(response.data.name).toBe(newProduct.name);
});


  // ✅ 2. Retrieve all products
  it('should retrieve all products', async () => {
    const response = await client.get('/product');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.data)).toBe(true);
    expect(response.data.length).toBeGreaterThan(0);
  });

  // ✅ 3. Retrieve product by ID
  it('should retrieve a product by ID', async () => {
    const newProduct = {
        name: 'Laptop',
        description: 'High performance laptop',
        price: 2000, // must be number, not string
        stock: 10,
    };

    const createResponse = await client.post('/product', newProduct);
    expect(createResponse.status).toBe(201);

    const createdProductId = createResponse.data._id;
    console.log('Created Product ID:', createdProductId);

    const getResponse = await client.get(`/product/${createdProductId}`);

    expect(getResponse.status).toBe(200);
    expect(getResponse.data._id.toString()).toBe(createdProductId.toString());
    expect(getResponse.data.name).toBe(newProduct.name);
    expect(getResponse.data.price).toBe(newProduct.price);
  });

  // ✅ 4. Update product
  it('should update a product', async () => {
    const newProduct = {
        name: 'Laptop',
        description: 'High performance laptop',
        price: 2000, // must be number, not string
        stock: 10,
    };

    const createResponse = await client.post('/product', newProduct);
    expect(createResponse.status).toBe(201);

    const createdProductId = createResponse.data._id;
    console.log('Created Product ID for update:', createdProductId);

    const updatedProduct = { price: 350, stock: 40 };
    const updateResponse = await client.patch(`/product/${createdProductId}`, updatedProduct);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.data.price).toBe(updatedProduct.price);
    expect(updateResponse.data.stock).toBe(updatedProduct.stock);
  });

  // ✅ 5. Delete product
  it('should delete a product', async () => {
    const newProduct = {
        name: 'Laptop',
        description: 'High performance laptop',
        price: 2000, // must be number, not string
        stock: 10,
    };

    const createResponse = await client.post('/product', newProduct);
    expect(createResponse.status).toBe(201);

    const createdProductId = createResponse.data._id;
    console.log('Created Product ID for deletion:', createdProductId);

    const deleteResponse = await client.delete(`/product/${createdProductId}`);
    expect(deleteResponse.status).toBe(200);

    try {
      await client.get(`/product/${createdProductId}`);
    } catch (err: any) {
      expect(err.response.status).toBe(404);
    }
  });

  // ❌ 6. Invalid product creation (missing required fields)
  it('should not create a product with missing required fields', async () => {
    const invalidProduct = { name: '', price: null };

    try {
      await client.post('/product', invalidProduct);
    } catch (err: any) {
      expect(err.response.status).toBe(400);
      console.log('Invalid Product Create Response:', err.response.data);
    }
  });

  // ❌ 7. Invalid product creation (negative price)
  it('should not create a product with a negative price', async () => {
    const invalidProduct = {
      name: 'Bad Apple',
      description: 'Should not be allowed',
      price: -200,
      stock: 10,
      category: 'Fruits',
    };

    try {
      await client.post('/product', invalidProduct);
    } catch (err: any) {
      expect(err.response.status).toBe(400);
      console.log('Invalid Price Response:', err.response.data);
    }
  });
});
