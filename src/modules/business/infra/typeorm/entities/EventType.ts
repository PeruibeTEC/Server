import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tb_event_type')
export default class EventType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
