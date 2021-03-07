import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import CrimeLocation from './CrimeLocation';
import CrimeType from './CrimeType';

@Entity('tb_crime')
export default class Crime {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('time')
  time: Date;

  @Column({
    length: 20,
  })
  title: string;

  @Column({
    length: 200,
    nullable: true,
  })
  description: string;

  /* ************************************************
   * I am currently following the structure defined
   * in the MER, however I think we should create a
   * table just for the stolen_items. I already
   * indicated this to the PeruíbeTec dev team
   * ************************************************
   */

  @Column({
    length: 160,
    nullable: true,
  })
  stolen_items: string;

  @Column()
  @ManyToOne(() => CrimeType)
  crime_type_id: CrimeType;

  @Column()
  @ManyToOne(() => CrimeLocation)
  crime_location_id: CrimeLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
