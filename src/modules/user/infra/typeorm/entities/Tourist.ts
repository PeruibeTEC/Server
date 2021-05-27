import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import User from './User';

@Entity('tb_tourist')
export default class Tourist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 2,
    nullable: true,
  })
  state: string;

  @Column({
    length: 45,
    nullable: true,
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
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
