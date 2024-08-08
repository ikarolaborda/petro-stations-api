import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PoiService } from './poi.service';
import { PoiController } from './poi.controller';
import { POI } from './entities/poi.entity';
import { OpeningHours } from './entities/opening-hours.entity';
import { Pump } from './entities/pump.entity';

@Module({
  imports: [TypeOrmModule.forFeature([POI, OpeningHours, Pump])],
  providers: [PoiService],
  controllers: [PoiController],
})
export class PoiModule {}
