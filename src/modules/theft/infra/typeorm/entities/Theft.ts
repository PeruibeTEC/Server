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
import User from '@modules/user/infra/typeorm/entities/User';

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
    length: 50,
    nullable: true,
  })
  title: string;

  @Column({
    length: 200,
    nullable: true,
  })
  description: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => TheftLocation)
  @JoinColumn({ name: 'theft_location_id' })
  theft_location_id: TheftLocation;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
