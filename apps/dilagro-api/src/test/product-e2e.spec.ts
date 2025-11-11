import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, Module, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { ProductController } from '../app/product/controllers/product.controller';
import { ProductService } from '../app/product/services/product.service';

describe('Product Controller (No Auth)', () => {
  let app: INestApplication;
  let testRequest: request.SuperTest<request.Test>;
  let productService: ProductService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [getDummyModule()],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    testRequest = request(app.getHttpServer());
    productService = moduleRef.get(ProductService);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`should be defined`, () => {
    expect(app).toBeDefined();
  });

  // ---------- SUCCESS CASES ----------

  it(`should send 201 for POST /product`, async () => {
    const res = await testRequest.post('/product').send(product());
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it(`should send 400 for POST /product with invalid payload`, async () => {
    const res = await testRequest.post('/product').send({});
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for GET /product`, async () => {
    const res = await testRequest.get('/product');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for GET /product/id`, async () => {
    const res = await testRequest.get('/product/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for PATCH /product/id`, async () => {
    const res = await testRequest.patch('/product/id').send({
      name: 'Updated Product',
      price: 199.99,
      stock: 50,
    });
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 400 for PATCH /product/id with wrong payload`, async () => {
    const res = await testRequest.patch('/product/id').send({ price: 'invalid' });
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for DELETE /product/id`, async () => {
    const res = await testRequest.delete('/product/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 500 for POST /product when database fails`, async () => {
    productService.create = jest.fn().mockImplementation(() => {
      throw new Error('Database connection failed');
    });
    const res = await testRequest.post('/product').send(product());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for POST /product when duplicate unique value inserted`, async () => {
    productService.create = jest.fn().mockImplementation(() => {
      const error: any = new Error('Duplicate entry');
      error.code = 'ER_DUP_ENTRY';
      throw error;
    });
    const res = await testRequest.post('/product').send(product());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for GET /product when service fails to respond`, async () => {
    productService.findAll = jest.fn().mockImplementation(() => {
      throw new Error('Service unavailable');
    });
    const res = await testRequest.get('/product');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for PATCH /product/:id if update logic fails`, async () => {
    productService.update = jest.fn().mockImplementation(() => {
      throw new Error('Update failed due to invalid state');
    });
    const res = await testRequest.patch('/product/id').send(product());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for DELETE /product/:id if delete operation fails`, async () => {
    productService.remove = jest.fn().mockImplementation(() => {
      throw new Error('Foreign key constraint error');
    });
    const res = await testRequest.delete('/product/id');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

// ------------------- Helpers -------------------

function product() {
  return {
    name: 'Test Product',
    description: 'A sample product',
    price: 99.99,
    stock: 10,
  };
}

function getDummyModule() {
  @Module({
    controllers: [ProductController],
    providers: [
      {
        provide: ProductService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },
      { provide: APP_PIPE, useValue: new ValidationPipe({ whitelist: true }) },
    ],
  })
  class DummyProductModule {}
  return DummyProductModule;
}
