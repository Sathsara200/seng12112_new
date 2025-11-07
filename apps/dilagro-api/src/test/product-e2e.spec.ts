import { INestApplication, Module, HttpStatus } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { VALIDATION_PIPE } from './utils/validation-pipe.utils';
import { ProductController } from '../app/product/controllers/product.controller';
import { ProductService } from '../app/product/services/product.service';

describe('Product Controller (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [getDummyProductModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('POST /product should create a new product (201)', async () => {
    const newProduct = { name: 'Rice', description: 'High-quality grain', price: 250, stock: 100 };

    const response = await request(app.getHttpServer())
      .post('/product')
      .send(newProduct)
      .expect(HttpStatus.CREATED);

    expect(response.body).toMatchObject(newProduct);
  });

  it('POST /product with invalid payload should return 400', async () => {
    const invalidProduct = { name: 123, price: 'invalid' };

    const response = await request(app.getHttpServer())
      .post('/product')
      .send(invalidProduct)
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.error).toBe('Bad Request');
  });

  it('GET /product should return all products (200)', async () => {
    const response = await request(app.getHttpServer())
      .get('/product')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('GET /product/:id should return a product (200)', async () => {
    const fakeId = 'mockProductId123';
    const response = await request(app.getHttpServer())
      .get(`/product/${fakeId}`)
      .expect(HttpStatus.OK);

    expect(response.body._id).toBe(fakeId);
  });

  it('PATCH /product/:id should update a product (200)', async () => {
    const fakeId = 'mockProductId123';
    const updatedProduct = { name: 'Updated Rice', price: 275 };

    const response = await request(app.getHttpServer())
      .patch(`/product/${fakeId}`)
      .send(updatedProduct)
      .expect(HttpStatus.OK);

    expect(response.body.name).toBe(updatedProduct.name);
  });

  it('DELETE /product/:id should remove a product (200)', async () => {
    const fakeId = 'mockProductId123';

    const response = await request(app.getHttpServer())
      .delete(`/product/${fakeId}`)
      .expect(HttpStatus.OK);

    expect(response.body.message).toContain(fakeId);
  });
});

function getDummyProductModule() {
  @Module({
    controllers: [ProductController],
    providers: [
      {
        provide: ProductService,
        useValue: {
          create: jest.fn().mockImplementation((dto) => ({
            _id: 'mockProductId123',
            ...dto,
          })),
          findAll: jest.fn().mockReturnValue([
            { _id: 'mockProductId123', name: 'Rice', description: 'Grain', price: 250, stock: 100 },
          ]),
          findOne: jest.fn().mockImplementation((id) => ({
            _id: id,
            name: 'Rice',
            description: 'High-quality grain',
            price: 250,
            stock: 100,
          })),
          update: jest.fn().mockImplementation((id, dto) => ({
            _id: id,
            ...dto,
          })),
          remove: jest.fn().mockImplementation((id) => ({
            message: `Product ${id} deleted`,
          })),
        },
      },
      { provide: APP_PIPE, useValue: VALIDATION_PIPE },
    ],
  })
  class DummyProductModule {}

  return DummyProductModule;
}
