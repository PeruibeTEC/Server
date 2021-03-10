import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
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

  @ManyToOne(() => CrimeType)
  @JoinColumn({ name: 'crime_type_id' })
  crime_type_id: CrimeType;

  @ManyToOne(() => CrimeLocation)
  @JoinColumn({ name: 'crime_location_id' })
  crime_location_id: CrimeLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
