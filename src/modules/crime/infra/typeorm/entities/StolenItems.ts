import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

import Crime from './Crime';

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

  @ManyToOne(() => Crime)
  @JoinColumn({ name: 'crime_id' })
  crime_id: Crime;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
