import { INestApplication, HttpStatus, Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { VALIDATION_PIPE } from './utils/validation-pipe.utils';
import { BankController } from '../app/bank/controllers/bank.controller';
import { BankService } from '../app/bank/services/bank.service';

describe('Bank Controller (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [getDummyBankModule()],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('✅ should be defined', () => {
    expect(app).toBeDefined();
  });

  it('✅ POST /bank should create a new bank (201)', async () => {
    const newBank = {
      name: 'People’s Bank',
      branchCode: 'KDY001',
      branch: 'Kandy',
      branchAddress: 'Main Street, Kandy',
      contactNumber: '0811234567',
    };

    const response = await request(app.getHttpServer())
      .post('/bank')
      .send(newBank)
      .expect(HttpStatus.CREATED);

    expect(response.body).toMatchObject(newBank);
  });

  it('❌ POST /bank with invalid payload should return 400', async () => {
    const invalidBank = {
      name: 123,
      branchCode: '',
      branch: 'Kandy',
      branchAddress: 999,
      contactNumber: null,
    };

    const response = await request(app.getHttpServer())
      .post('/bank')
      .send(invalidBank)
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body.error).toBe('Bad Request');
  });

  it('✅ GET /bank should return all banks (200)', async () => {
    const response = await request(app.getHttpServer())
      .get('/bank')
      .expect(HttpStatus.OK);

    expect(Array.isArray(response.body)).toBe(true);
  });

  it('✅ GET /bank/:id should return a bank (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    const response = await request(app.getHttpServer())
      .get(`/bank/${fakeId}`)
      .expect(HttpStatus.OK);

    expect(response.body._id).toBe(fakeId);
  });

  it('✅ PATCH /bank/:id should update a bank (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    const updatedBank = {
      name: 'Updated People’s Bank',
      branchCode: 'KDY002',
      branch: 'Peradeniya',
      branchAddress: 'New Road, Peradeniya',
      contactNumber: '0819999999',
    };

    const response = await request(app.getHttpServer())
      .patch(`/bank/${fakeId}`)
      .send(updatedBank)
      .expect(HttpStatus.OK);

    expect(response.body).toMatchObject(updatedBank);
  });

  it('✅ DELETE /bank/:id should remove a bank (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    const response = await request(app.getHttpServer())
      .delete(`/bank/${fakeId}`)
      .expect(HttpStatus.OK);

    expect(response.body.message).toContain('deleted');
  });
});

function getDummyBankModule() {
  @Module({
    controllers: [BankController],
    providers: [
      {
        provide: BankService,
        useValue: {
          create: jest.fn().mockImplementation((dto) => ({
            _id: 'mockBankId123',
            ...dto,
          })),
          findAll: jest.fn().mockReturnValue([
            {
              _id: 'mockBankId123',
              name: 'People’s Bank',
              branchCode: 'KDY001',
              branch: 'Kandy',
              branchAddress: 'Main Street, Kandy',
              contactNumber: '0811234567',
            },
          ]),
          findOne: jest.fn().mockImplementation((id) => ({
            _id: id,
            name: 'People’s Bank',
            branchCode: 'KDY001',
            branch: 'Kandy',
            branchAddress: 'Main Street, Kandy',
            contactNumber: '0811234567',
          })),
          update: jest.fn().mockImplementation((id, dto) => ({
            _id: id,
            ...dto,
          })),
          remove: jest.fn().mockImplementation((id) => ({
            message: `Bank ${id} deleted`,
          })),
        },
      },
      { provide: APP_PIPE, useValue: VALIDATION_PIPE },
    ],
  })
  class DummyBankModule {}

  return DummyBankModule;
}
