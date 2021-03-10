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

@Entity('tb_business_contact')
export default class BusinessContact {
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
  contact_email: string;

  @Column({
    length: 11,
    nullable: true,
  })
  cellphone: string;

  @Column({
    length: 11,
  })
  tellphone: string;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business_id: Business;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}