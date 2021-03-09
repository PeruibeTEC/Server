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
import Post from './Post';

@Entity('tb_comment')
export default class Comment extends Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 160,
  })
  contents: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post_id: Post;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
