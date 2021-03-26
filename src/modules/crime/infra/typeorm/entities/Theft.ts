import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import TheftLocation from './TheftLocation';

@Entity('tb_theft')
export default class Theft {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('time', {
    nullable: true,
  })
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

  @ManyToOne(() => TheftLocation)
  @JoinColumn({ name: 'theft_location_id' })
  theft_location_id: TheftLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
