import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus, Module } from '@nestjs/common';
import request from 'supertest';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { CityController } from '../app/city/controllers/city.controller';
import { CityService } from '../app/city/services/city.service';

describe('City Controller (No Auth)', () => {
  let app: INestApplication;
  let testRequest: request.SuperTest<request.Test>;
  let cityService: CityService;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [getDummyModule()],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    await app.init();

    testRequest = request(app.getHttpServer());
    cityService = moduleRef.get(CityService);
  });

  afterAll(async () => {
    await app.close();
  });

  it(`should be defined`, () => {
    expect(app).toBeDefined();
  });

  it(`should send 201 for POST /city`, async () => {
    cityService.create = jest.fn().mockResolvedValue(city());
    const res = await testRequest.post('/city').send(city());
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it(`should send 400 for POST /city with invalid payload`, async () => {
    const res = await testRequest.post('/city').send({});
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for GET /city`, async () => {
    cityService.findAll = jest.fn().mockResolvedValue([city()]);
    const res = await testRequest.get('/city');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for GET /city/id`, async () => {
    cityService.findOne = jest.fn().mockResolvedValue(city());
    const res = await testRequest.get('/city/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for PATCH /city/id`, async () => {
    cityService.update = jest.fn().mockResolvedValue({ ...city(), name: 'Updated City' });
    const res = await testRequest.patch('/city/id').send({
      name: 'Updated City',
      district: 'Updated District',
    });
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 400 for PATCH /city/id with wrong payload`, async () => {
    const res = await testRequest.patch('/city/id').send({ name: '' });
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for DELETE /city/id`, async () => {
    cityService.remove = jest.fn().mockResolvedValue(true);
    const res = await testRequest.delete('/city/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  // ---------- REALISTIC 500 ERROR TESTS BELOW ----------

  it(`should send 500 for POST /city when database fails`, async () => {
    cityService.create = jest.fn().mockImplementation(() => {
      throw new Error('Database connection failed');
    });
    const res = await testRequest.post('/city').send(city());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for POST /city when duplicate unique value inserted`, async () => {
    cityService.create = jest.fn().mockImplementation(() => {
      const error: any = new Error('Duplicate entry');
      error.code = 'ER_DUP_ENTRY';
      throw error;
    });
    const res = await testRequest.post('/city').send(city());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for GET /city when service fails to respond`, async () => {
    cityService.findAll = jest.fn().mockImplementation(() => {
      throw new Error('Service unavailable');
    });
    const res = await testRequest.get('/city');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for PATCH /city/:id if update logic fails`, async () => {
    cityService.update = jest.fn().mockImplementation(() => {
      throw new Error('Update failed due to invalid state');
    });
    const res = await testRequest.patch('/city/id').send(city());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });

  it(`should send 500 for DELETE /city/:id if delete operation fails`, async () => {
    cityService.remove = jest.fn().mockImplementation(() => {
      throw new Error('Foreign key constraint error');
    });
    const res = await testRequest.delete('/city/id');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
  });
});

// ------------------- Helpers -------------------

function city() {
  return {
    name: 'Test City',
    district: 'Test District',
  };
}

function getDummyModule() {
  @Module({
    controllers: [CityController],
    providers: [
      {
        provide: CityService,
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
  class DummyCityModule {}
  return DummyCityModule;
}
