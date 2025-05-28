import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { AddHolidayDto } from './dto/add-holidays.dto';
import { CalendarEvent } from './entities/calendar-event.entity';

interface PublicHoliday {
  date: string;
  localName: string;
  name: string;
}

@Injectable()
export class CalendarService {
  private readonly HOLIDAYS_URL = 'https://date.nager.at/api/v3/PublicHolidays';

  constructor(
    private readonly http: HttpService,
    private readonly userService: UsersService,

    @InjectRepository(CalendarEvent)
    private readonly eventRepo: Repository<CalendarEvent>,

    @InjectRepository(User)
    private readonly userRepo: Repository<any>,
  ) {}

  async addHolidays(
    userId: number,
    addHolidayDto: AddHolidayDto,
  ): Promise<CalendarEvent[]> {
    await this.userService.findUserById(userId);

    let holidays: PublicHoliday[];
    try {
      const url = `${this.HOLIDAYS_URL}/${addHolidayDto.year}/${addHolidayDto.countryCode}`;
      const response$ = this.http.get<PublicHoliday[]>(url);
      const response = await firstValueFrom(response$);

      holidays = response.data;
      console.log(holidays);

      const filteredHolidays = holidays.filter((holiday) =>
        addHolidayDto.holidays.includes(holiday.name),
      );

      const events = filteredHolidays.map((holiday) =>
        this.eventRepo.create({
          title: holiday.name,
          date: holiday.date,
          userId,
        }),
      );

      return this.eventRepo.save(events);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch public holidays',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
