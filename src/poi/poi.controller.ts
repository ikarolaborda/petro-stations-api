import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { PoiService } from './poi.service';
import { POI } from './entities/poi.entity';

@Controller('pois')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  @Get()
  findAll(@Query('page') page?: number, @Query('limit') limit?: number) {
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;
    return this.poiService.findAll(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poiService.findOne(id);
  }

  @Post()
  create(@Body() poi: POI) {
    return this.poiService.create(poi);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() poi: POI) {
    return this.poiService.update(id, poi);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poiService.remove(id);
  }
}
