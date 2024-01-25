import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Position } from './position.entity';

@Entity({ name: 'employee' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  address: string;

  @ManyToMany(() => Position, (Position) => Position.name)
  @JoinTable()
  positions: Position[];

  @Column({ default: false })
  superAdmin: boolean;
}
