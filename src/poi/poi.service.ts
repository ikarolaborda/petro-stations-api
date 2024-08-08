import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { POI } from './entities/poi.entity';

@Injectable()
export class PoiService {
  constructor(
    @InjectRepository(POI)
    private poiRepository: Repository<POI>,
  ) {}

  async findAll(page: number, limit: number): Promise<POI[]> {
    return await this.poiRepository.find({
      relations: ['openingHours', 'pumps'],
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOne(id: string): Promise<POI> {
    return await this.poiRepository.findOne({
      where: { id },
      relations: ['openingHours', 'pumps'],
    });
  }

  async create(poi: POI): Promise<POI> {
    return await this.poiRepository.save(poi);
  }

  async update(id: string, poi: POI): Promise<void> {
    await this.poiRepository.update(id, poi);
  }

  async remove(id: string): Promise<void> {
    await this.poiRepository.delete(id);
  }
}
