import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  Timestamp,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';
import EventTypeUser from './EventTypeUser';

@Entity('tb_event_user')
export default class EventUser extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
  })
  name: string;

  @Column()
  date: Date;

  @Column({
    nullable: true,
  })
  start_time: Timestamp;

  @Column({
    nullable: true,
  })
  end_time: Timestamp;

  @Column({
    length: 160,
    nullable: true,
  })
  description: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @ManyToOne(() => EventTypeUser)
  @JoinColumn({ name: 'event_type_id' })
  event_type_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
