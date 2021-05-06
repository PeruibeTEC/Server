import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
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

  @Column({
    length: 3000,
    nullable: true,
  })
  background_photo: string;

  @Column()
  is_tourist: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
