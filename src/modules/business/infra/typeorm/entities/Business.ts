import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import BusinessType from './BusinessType';

@Entity('tb_business')
export default class Business {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @Column({
    length: 255,
    unique: true,
  })
  email_login: string;

  @Column({
    length: 655,
  })
  password: string;

  @Column({
    length: 3000,
  })
  description: string;

  @Column({
    length: 3000,
  })
  profile_photo: string;

  @Column({
    length: 3000,
    nullable: true,
  })
  background_photo: string;

  @Column('time')
  operating_time: Date;

  @Column('time')
  closing_time: Date;

  @Column({
    length: 160,
  })
  closing_day: string;

  @Column({ nullable: true })
  business_type_id: string;

  @ManyToOne(() => BusinessType)
  @JoinColumn({ name: 'business_type_id' })
  businessType: BusinessType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
