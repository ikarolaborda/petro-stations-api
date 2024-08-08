import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { POI } from './poi.entity';

@Entity()
export class Pump {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('jsonb')
  fuelProducts: { type: string; price: number }[];

  @ManyToOne(() => POI, poi => poi.pumps)
  poi: POI;
}