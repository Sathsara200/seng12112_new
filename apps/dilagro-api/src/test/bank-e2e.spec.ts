import { HttpStatus, INestApplication, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import TestAgent from 'supertest/lib/agent';

import { VALIDATION_PIPE } from './utils/validation-pipe.utils';
import { BankController } from '../app/bank/controllers/bank.controller';
import { BankService } from '../app/bank/services/bank.service';

describe('Bank Controller (No Auth)', () => {
  let app: INestApplication;
  let testRequest: TestAgent<request.Test>;

  beforeAll(async () => {
    const setup = await beforeSetup();
    app = setup.app;
    testRequest = setup.testRequest;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => expect(app).toBeDefined());

  it(`should send 201 for POST /bank`, async () => {
    const res = await testRequest.post('/bank').send(bank());
    expect(res.status).toBe(HttpStatus.CREATED);
  });

  it(`should send 400 for POST /bank with invalid payload`, async () => {
    const res = await testRequest.post('/bank').send({});
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for GET /bank`, async () => {
    const res = await testRequest.get('/bank');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for GET /bank/id`, async () => {
    const res = await testRequest.get('/bank/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 200 for PATCH /bank/id`, async () => {
    const res = await testRequest
      .patch('/bank/id')
      .send({ name: 'Updated Bank', branch: 'Kandy' });
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 400 for PATCH /bank/id with wrong payload`, async () => {
    const res = await testRequest.patch('/bank/id').send({ name: '' });
    expect(res.status).toBe(HttpStatus.BAD_REQUEST);
  });

  it(`should send 200 for DELETE /bank/id`, async () => {
    const res = await testRequest.delete('/bank/id');
    expect(res.status).toBe(HttpStatus.OK);
  });

  it(`should send 500 for POST /bank when service fails`, async () => {
    const setup = await beforeSetupWithErrors({
      create: () => {
        throw new Error('Database connection failed');
      },
    });

    const res = await setup.testRequest.post('/bank').send(bank());
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

    await setup.app.close();
  });

  it(`should send 500 for GET /bank when service fails`, async () => {
    const setup = await beforeSetupWithErrors({
      findAll: () => {
        throw new Error('Service unavailable');
      },
    });

    const res = await setup.testRequest.get('/bank');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

    await setup.app.close();
  });

  it(`should send 500 for PATCH /bank/:id when update fails`, async () => {
    const setup = await beforeSetupWithErrors({
      update: () => {
        throw new Error('Unable to update bank record');
      },
    });

    const res = await setup.testRequest
      .patch('/bank/id')
      .send({ name: 'Broken Bank', branch: 'CrashTown' });

    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

    await setup.app.close();
  });

  it(`should send 500 for DELETE /bank/:id when remove fails`, async () => {
    const setup = await beforeSetupWithErrors({
      remove: () => {
        throw new Error('Failed to remove bank');
      },
    });

    const res = await setup.testRequest.delete('/bank/id');
    expect(res.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);

    await setup.app.close();
  });
});

function bank() {
  return {
    name: 'National Bank',
    branchCode: 'NB001',
    branch: 'Colombo Main',
    branchAddress: '123, Galle Road, Colombo 03',
    contactNumber: '0112345678',
  };
}

async function beforeSetup() {
  const dummyModule = getDummyModule();

  const moduleFixture = await Test.createTestingModule({
    imports: [dummyModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();
  const testRequest = request(app.getHttpServer());

  return { app, testRequest };
}

async function beforeSetupWithErrors(serviceOverrides: Partial<BankService>) {
  @Module({
    controllers: [BankController],
    providers: [
      {
        provide: BankService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
          ...serviceOverrides, // Override specific methods to throw real errors
        },
      },
      { provide: APP_PIPE, useValue: VALIDATION_PIPE },
    ],
  })
  class DummyErrorBankModule {}

  const moduleFixture = await Test.createTestingModule({
    imports: [DummyErrorBankModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  const testRequest = request(app.getHttpServer());
  return { app, testRequest };
}

function getDummyModule() {
  @Module({
    controllers: [BankController],
    providers: [
      {
        provide: BankService,
        useValue: {
          create: jest.fn(),
          findAll: jest.fn(),
          findOne: jest.fn(),
          update: jest.fn(),
          remove: jest.fn(),
        },
      },
      { provide: APP_PIPE, useValue: VALIDATION_PIPE },
    ],
  })
  class DummyBankModule {}

  return DummyBankModule;
}
