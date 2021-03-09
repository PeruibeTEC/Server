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
import PublicProject from './PublicProject';

@Entity('tb_project_comment')
export default class ProjectComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  content: string;

  @Column()
  has_photo: boolean;

  @ManyToOne(() => PublicProject)
  @JoinColumn({ name: 'public_project_id' })
  public_project_id: PublicProject;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user_id: PublicProject;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
