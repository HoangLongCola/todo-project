import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: false })
  is_completed: boolean;

  @Column({ default: false })
  is_hidden: boolean;

  @Column({ default: false })
  is_pinned: boolean;

  @Column({ default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'date', nullable: true })
  due_date: string;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
