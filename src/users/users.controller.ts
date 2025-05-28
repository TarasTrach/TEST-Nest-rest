import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CalendarService } from 'src/calendar/calendar.service';
import { AddHolidayDto } from 'src/calendar/dto/add-holidays.dto';
import { CalendarEvent } from 'src/calendar/entities/calendar-event.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly calendarService: CalendarService,
  ) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findUserById(id);
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Post(':userId/calendar/holidays')
  async addHolidaysToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() addHolidayDto: AddHolidayDto,
  ): Promise<CalendarEvent[]> {
    return this.calendarService.addHolidays(userId, addHolidayDto);
  }
}
