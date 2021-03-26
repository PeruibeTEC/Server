import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tb_interest_point')
export default class InterestPointType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
  })
  name: string;

  @Column({
    length: 3000,
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
