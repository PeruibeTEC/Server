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

@Entity('tb_stolen_items')
export default class StolenItems {
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

  @ManyToOne(() => Theft)
  @JoinColumn({ name: 'theft_id' })
  theft_id: Theft;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
