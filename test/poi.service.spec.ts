import { Test, TestingModule } from '@nestjs/testing';
import { PoiService } from '../src/poi/poi.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POI } from '../src/poi/entities/poi.entity';

const mockPoiRepository = {
  find: jest.fn(),
  findOne: jest.fn(),
  save: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('PoiService', () => {
  let service: PoiService;
  let repository: Repository<POI>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PoiService,
        {
          provide: getRepositoryToken(POI),
          useValue: mockPoiRepository,
        },
      ],
    }).compile();

    service = module.get<PoiService>(PoiService);
    repository = module.get<Repository<POI>>(getRepositoryToken(POI));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find all POIs with pagination', async () => {
    const result = [];
    jest.spyOn(repository, 'find').mockResolvedValue(result);
    expect(await service.findAll(1, 10)).toBe(result);
  });

  it('should find one POI by id', async () => {
    const result = new POI();
    jest.spyOn(repository, 'findOne').mockResolvedValue(result);
    expect(await service.findOne('1')).toBe(result);
  });

  it('should create a new POI', async () => {
    const poi = new POI();
    jest.spyOn(repository, 'save').mockResolvedValue(poi);
    expect(await service.create(poi)).toBe(poi);
  });

  it('should update a POI', async () => {
    const poi = new POI();
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    await service.update('1', poi);
    expect(repository.update).toHaveBeenCalledWith('1', poi);
  });

  it('should delete a POI', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    await service.remove('1');
    expect(repository.delete).toHaveBeenCalledWith('1');
  });
});
