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
    precision: 10,
    scale: 7,
  })
  latitude: string;

  @Column({
    precision: 10,
    scale: 7,
  })
  longitude: string;

  @Column()
  starting_date: Date;

  @Column()
  ending_date: Date;

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
