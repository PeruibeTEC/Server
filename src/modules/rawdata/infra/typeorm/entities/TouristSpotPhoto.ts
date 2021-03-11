import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import TouristSpot from './TouristSpot';

@Entity('tb_tourist_spot_photo')
export default class TouristSpotPhoto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 3000,
  })
  url: string;

  @ManyToOne(() => TouristSpot)
  @JoinColumn({ name: 'tourist_spot_id' })
  tourist_spot_id: TouristSpot;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
