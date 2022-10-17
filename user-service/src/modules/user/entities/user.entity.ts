import { Role } from './role.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: true })
  avatar: string = '';

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable()
  // roles: Role[];
}
