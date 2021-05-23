import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import Business from './Business';

@Entity('tb_business_contact')
export default class BusinessContact {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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
    nullable: true,
  })
  tellphone: string;

  @Column({ nullable: true })
  business_id: string;

  @ManyToOne(() => Business)
  @JoinColumn({ name: 'business_id' })
  business: Business;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
