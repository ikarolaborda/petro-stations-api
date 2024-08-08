import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { POI } from '../src/poi/entities/poi.entity';

describe('PoiController (e2e)', () => {
  let app: INestApplication;
  let repository: Repository<POI>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    repository = moduleFixture.get<Repository<POI>>(getRepositoryToken(POI));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/pois (GET)', async () => {
    return request(app.getHttpServer()).get('/pois').expect(200).expect([]);
  });

  it('/pois (POST)', async () => {
    const poi: Partial<POI> = {
      status: 'ONLINE',
      country: 'Country',
      zipCode: '12345',
      city: 'City',
      street: 'Street',
      houseNumber: '123',
    };
    const response = await request(app.getHttpServer())
      .post('/pois')
      .send(poi)
      .expect(201);

    expect(response.body).toEqual(
      expect.objectContaining({
        ...poi,
        id: expect.any(String),
      }),
    );
  });

  it('/pois/:id (GET)', async () => {
    const poi = await repository.save({
      status: 'ONLINE',
      country: 'Country',
      zipCode: '12345',
      city: 'City',
      street: 'Street',
      houseNumber: '123',
    });

    return request(app.getHttpServer())
      .get(`/pois/${poi.id}`)
      .expect(200)
      .expect(poi);
  });

  it('/pois/:id (PUT)', async () => {
    const poi = await repository.save({
      status: 'ONLINE',
      country: 'Country',
      zipCode: '12345',
      city: 'City',
      street: 'Street',
      houseNumber: '123',
    });

    const updatedPoi: Partial<POI> = {
      status: 'OFFLINE',
    };

    await request(app.getHttpServer())
      .put(`/pois/${poi.id}`)
      .send(updatedPoi)
      .expect(200);

    const updatedEntity = await repository.findOne({ where: { id: poi.id } });
    expect(updatedEntity).toEqual(expect.objectContaining(updatedPoi));
  });

  it('/pois/:id (DELETE)', async () => {
    const poi = await repository.save({
      status: 'ONLINE',
      country: 'Country',
      zipCode: '12345',
      city: 'City',
      street: 'Street',
      houseNumber: '123',
    });

    await request(app.getHttpServer()).delete(`/pois/${poi.id}`).expect(200);

    const deletedEntity = await repository.findOne({ where: { id: poi.id } });
    expect(deletedEntity).toBeUndefined();
  });
});
