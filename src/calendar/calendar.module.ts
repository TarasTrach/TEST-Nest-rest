import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { CalendarService } from './calendar.service';
import { CalendarEvent } from './entities/calendar-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent, User]), HttpModule],
  controllers: [],
  providers: [CalendarService, UsersService],
})
export class CalendarModule {}
