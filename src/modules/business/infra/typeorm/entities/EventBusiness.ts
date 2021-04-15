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
import EventTypeBusiness from './EventTypeBusiness';

@Entity('tb_event_business')
export default class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column('time', {
    nullable: true,
  })
  start_time: Date;

  @Column('time', {
    nullable: true,
  })
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

  @ManyToOne(() => EventTypeBusiness)
  @JoinColumn({ name: 'event_type_business_id' })
  event_type_id: EventTypeBusiness;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
