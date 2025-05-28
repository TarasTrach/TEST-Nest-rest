import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from 'src/calendar/calendar.service';
import { CalendarEvent } from 'src/calendar/entities/calendar-event.entity';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, CalendarEvent]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService, CalendarService],
})
export class UsersModule {}
