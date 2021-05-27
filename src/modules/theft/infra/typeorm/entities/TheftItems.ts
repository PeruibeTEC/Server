import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Theft from './Theft';

@Entity('tb_theft_items')
export default class TheftItems {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 200,
  })
  items: string;

  @Column({
    type: 'int',
  })
  amount: number;

  @Column()
  theft_id: string;

  @ManyToOne(() => Theft)
  @JoinColumn({ name: 'theft_id' })
  theft: Theft;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
