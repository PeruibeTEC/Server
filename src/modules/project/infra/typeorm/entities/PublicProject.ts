import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tb_public_project')
export default class PublicProject {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column({
    length: 150,
    nullable: true,
  })
  street: string;

  @Column({
    length: 100,
    nullable: true,
  })
  district: string;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  latitude: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 7,
  })
  longitude: number;

  @Column('timestamp')
  starting_date: Date;

  @Column('timestamp')
  ending_date: Date;

  @Column({
    type: 'decimal',
    precision: 15,
    scale: 7,
  })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
