import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import InfoAddress from './InfoAddress';
import InfoType from './InfoType';

@Entity('tb_info')
export default class Info {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 10,
  })
  telephone: string;

  @ManyToOne(() => InfoAddress)
  @JoinColumn({ name: 'info_address_id' })
  info_address_id: InfoAddress;

  @ManyToOne(() => InfoType)
  @JoinColumn({ name: 'info_type_id' })
  info_type_id: InfoType;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
