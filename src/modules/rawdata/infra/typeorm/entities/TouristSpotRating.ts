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

@Entity('tb_tourist_spot_rating')
export default class TouristSpotRating {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'decimal',
    precision: 2,
  })
  value: number;

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
