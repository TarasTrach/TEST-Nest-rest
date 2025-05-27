import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('available')
  async getAvailable(): Promise<any> {
    const countries = await this.countriesService.getAvailableCountries();
    return { data: countries };
  }

  @Get(':code/info')
  async getCountryInfo(@Param('code') code: string) {
    return await this.countriesService.getCountryInfo(code);
  }
}
