import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

import User from './User';

@Entity('tb_tourist')
export default class Tourist extends User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 2,
  })
  state: string;

  @Column({
    length: 45,
  })
  city: string;

  @Column()
  is_foreigner: boolean;

  @Column({
    length: 25,
    nullable: true,
  })
  country_foreigner: string;

  @Column()
  @ManyToOne(() => User)
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
