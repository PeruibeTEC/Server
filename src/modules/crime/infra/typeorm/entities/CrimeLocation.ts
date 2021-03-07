import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tb_crime_location')
export default class CrimeLocation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
  })
  street: string;

  @Column({
    length: 10,
    nullable: true,
  })
  number: string;

  @Column({
    length: 100,
  })
  district: string;

  @Column({
    precision: 10,
    scale: 7,
  })
  latitude: number;

  @Column({
    precision: 10,
    scale: 7,
  })
  longitude: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
