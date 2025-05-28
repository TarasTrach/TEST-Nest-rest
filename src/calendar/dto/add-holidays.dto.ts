import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsInt,
  IsString,
} from 'class-validator';

export class AddHolidayDto {
  @IsString()
  countryCode: string;

  @IsInt()
  year: number;

  @IsArray()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsString({ each: true })
  holidays: string[];
}
