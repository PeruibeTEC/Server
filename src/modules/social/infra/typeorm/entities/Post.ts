import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';

@Entity('tb_post')
export default class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
    nullable: true,
  })
  content: string;

  @Column()
  has_photo: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
