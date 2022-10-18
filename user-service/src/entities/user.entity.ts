import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  // @Column({ default: true })
  // avatar = '';

  @Column()
  createdAt: Date = new Date();

  @Column()
  updatedAt: Date = new Date();

  // @ManyToMany(() => Role, (role) => role.users)
  // @JoinTable()
  // roles: Role[];
}
