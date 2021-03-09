import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('tb_user')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 45,
  })
  name: string;

  @Column({
    length: 45,
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    length: 160,
    nullable: true,
  })
  small_biography: string;

  @Column({
    nullable: true,
  })
  photo: string;

  @Column()
  is_tourist: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
