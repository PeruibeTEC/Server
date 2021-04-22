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
import Post from './Post';

@Entity('tb_comment')
export default class Comment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 160,
  })
  content: string;

  @Column({ nullable: true })
  user_id: string;

  @Column({ nullable: true })
  post_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
