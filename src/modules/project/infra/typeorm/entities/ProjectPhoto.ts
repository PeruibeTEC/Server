import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import ProjectComment from './ProjectComment';

@Entity('tb_project_photo')
export default class ProjectPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 3000,
  })
  url: string;

  @ManyToOne(() => ProjectComment)
  @JoinColumn({ name: 'project_comment_id' })
  comment_id: ProjectComment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
