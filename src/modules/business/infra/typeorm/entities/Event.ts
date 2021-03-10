import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Business from './Business';
import EventType from './EventType';

@Entity('tb_event')
export default class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('time')
  start_time: Date;

  @Column('time')
  end_time: Date;

  @Column({
    length: 3000,
    nullable: true,
  })
  background_photo: string;

  @Column({
    length: 255,
  })
  description: string;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business_id: Business;

  @ManyToOne(() => EventType)
  @JoinColumn({ name: 'event_type_id' })
  event_type_id: EventType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
