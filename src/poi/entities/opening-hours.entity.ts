import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { POI } from './poi.entity';

@Entity()
export class OpeningHours {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  day: string;

  @Column()
  open: string;

  @Column()
  close: string;

  @ManyToOne(() => POI, poi => poi.openingHours)
  poi: POI;
}