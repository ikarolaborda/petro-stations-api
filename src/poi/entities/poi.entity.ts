import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OpeningHours } from './opening-hours.entity';
import { Pump } from './pump.entity';

@Entity()
export class POI {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  status: string;

  @Column()
  country: string;

  @Column()
  zipCode: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  houseNumber: string;

  @OneToMany(() => OpeningHours, openingHours => openingHours.poi)
  openingHours: OpeningHours[];

  @OneToMany(() => Pump, pump => pump.poi)
  pumps: Pump[];
}