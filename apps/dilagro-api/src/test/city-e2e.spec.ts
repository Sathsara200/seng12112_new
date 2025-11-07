import { INestApplication, Module, HttpStatus } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { Test } from '@nestjs/testing';
import request from 'supertest';
import { VALIDATION_PIPE } from './utils/validation-pipe.utils';
import { CityController } from '../app/city/controllers/city.controller';
import { CityService } from '../app/city/services/city.service';

describe('City Controller (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [getDummyCityModule()],
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

  it('POST /city should create a new city (201)', async () => {
    const newCity = { name: 'Colombo' };
    const response = await request(app.getHttpServer())
      .post('/city')
      .send(newCity)
      .expect(HttpStatus.CREATED);

    expect(response.body.name).toBe(newCity.name);
  });

  it('POST /city with invalid payload should return 400', async () => {
    const response = await request(app.getHttpServer())
      .post('/city')
      .send({ name: 12345 })
      .expect(HttpStatus.BAD_REQUEST);

    expect(response.body).toEqual({
        statusCode: 400,
        message: ['City name is too long', 'name must be a string'],
        error: 'Bad Request',
    });

  });

  it('GET /city should return all cities (200)', async () => {
    await request(app.getHttpServer()).get('/city').expect(HttpStatus.OK);
  });

  it('GET /city/:id should return a city (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    await request(app.getHttpServer())
      .get(`/city/${fakeId}`)
      .expect(HttpStatus.OK);
  });

  it('PATCH /city/:id should update city (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    const updatedCity = { name: 'Kandy' };

    const response = await request(app.getHttpServer())
      .patch(`/city/${fakeId}`)
      .send(updatedCity)
      .expect(HttpStatus.OK);

    expect(response.body.name).toBe(updatedCity.name);
  });

  it('DELETE /city/:id should remove city (200)', async () => {
    const fakeId = '6734f4b4b37d2a43d8a7e122';
    await request(app.getHttpServer())
      .delete(`/city/${fakeId}`)
      .expect(HttpStatus.OK);
  });
});

function getDummyCityModule() {
  @Module({
    controllers: [CityController],
    providers: [
      {
        provide: CityService,
        useValue: {
          create: jest.fn().mockImplementation((dto) => ({
            _id: 'mockId123',
            ...dto,
          })),
          findAll: jest.fn().mockReturnValue([{ _id: 'mockId123', name: 'Colombo' }]),
          findOne: jest.fn().mockImplementation((id) => ({
            _id: id,
            name: 'Colombo',
          })),
          update: jest.fn().mockImplementation((id, dto) => ({
            _id: id,
            ...dto,
          })),
          remove: jest.fn().mockImplementation((id) => ({
            message: `City ${id} deleted`,
          })),
        },
      },
      { provide: APP_PIPE, useValue: VALIDATION_PIPE },
    ],
  })
  class DummyCityModule {}

  return DummyCityModule;
}
