import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Business from './Business';

@Entity('tb_business_location')
export default class BusinessLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 205,
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

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  longitude: number;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business_id: Business;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
