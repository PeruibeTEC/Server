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
  user_id: string;

  @Column()
  public_project_id: string;

  @ManyToOne(() => PublicProject)
  @JoinColumn({ name: 'public_project_id' })
  project: PublicProject;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
