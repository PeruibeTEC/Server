import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import InterestPointType from './InterestPointType';

@Entity('tb_interest_point')
export default class InterestPoint {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
  })
  name: string;

  @Column({
    length: 10,
  })
  telephone: string;

  @Column({
    length: 150,
  })
  street: string;

  @Column({
    length: 10,
  })
  number: string;

  @Column({
    length: 100,
  })
  district: string;

  @ManyToOne(() => InterestPointType)
  @JoinColumn({ name: 'interest_point_type_id' })
  interest_point_type_id: InterestPointType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
