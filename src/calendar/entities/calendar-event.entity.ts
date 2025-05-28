import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CalendarEvent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.calendarEvents, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;
}
