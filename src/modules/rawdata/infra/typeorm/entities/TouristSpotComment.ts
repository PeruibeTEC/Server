import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import User from '../../../../user/infra/typeorm/entities/User';
import TouristSpot from './TouristSpot';

@Entity('tb_tourist_spot_comment')
export default class TouristSpotComment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 255,
  })
  content: string;

  @Column({ nullable: true })
  tourist_spot_id: string;

  @Column({ nullable: true })
  user_id: string;

  @ManyToOne(() => TouristSpot)
  @JoinColumn({ name: 'tourist_spot_id' })
  tourist_spot: TouristSpot;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
