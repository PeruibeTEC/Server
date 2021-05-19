import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '../../../../user/infra/typeorm/entities/User';
import EventTypeUser from './EventTypeUser';

@Entity('tb_event_user')
export default class EventUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
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
    length: 160,
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  event_type_id: string;

  @ManyToOne(() => EventTypeUser)
  @JoinColumn({ name: 'event_type_id' })
  eventType: EventTypeUser;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
