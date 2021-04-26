import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Post from './Post';

@Entity('tb_photo_post')
export default class PhotoPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 3000,
  })
  url: string;

  @Column({ nullable: true })
  post_id: string;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
