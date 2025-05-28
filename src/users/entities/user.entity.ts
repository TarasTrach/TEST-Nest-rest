import { CalendarEvent } from 'src/calendar/entities/calendar-event.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => CalendarEvent, (event) => event.user)
  calendarEvents: CalendarEvent[];
}
