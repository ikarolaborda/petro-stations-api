import { Test, TestingModule } from '@nestjs/testing';
import { PoiController } from '../src/poi/poi.controller';
import { PoiService } from '../src/poi/poi.service';
import { POI } from '../src/poi/entities/poi.entity';

const mockPoiService = {
  findAll: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

describe('PoiController', () => {
  let controller: PoiController;
  let service: PoiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PoiController],
      providers: [
        {
          provide: PoiService,
          useValue: mockPoiService,
        },
      ],
    }).compile();

    controller = module.get<PoiController>(PoiController);
    service = module.get<PoiService>(PoiService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should get all POIs with pagination', async () => {
    const result = [];
    jest.spyOn(service, 'findAll').mockResolvedValue(result);
    expect(await controller.findAll(1, 10)).toBe(result);
  });

  it('should get one POI by id', async () => {
    const result = new POI();
    jest.spyOn(service, 'findOne').mockResolvedValue(result);
    expect(await controller.findOne('1')).toBe(result);
  });

  it('should create a new POI', async () => {
    const poi = new POI();
    jest.spyOn(service, 'create').mockResolvedValue(poi);
    expect(await controller.create(poi)).toBe(poi);
  });

  it('should update a POI', async () => {
    const poi = new POI();
    jest.spyOn(service, 'update').mockResolvedValue(undefined);
    await controller.update('1', poi);
    expect(service.update).toHaveBeenCalledWith('1', poi);
  });

  it('should delete a POI', async () => {
    jest.spyOn(service, 'remove').mockResolvedValue(undefined);
    await controller.remove('1');
    expect(service.remove).toHaveBeenCalledWith('1');
  });
});
