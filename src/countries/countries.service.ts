import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  FlagResponse,
  NagerCountryInfo,
  PopulationResponse,
} from './interfaces/countries.interface';

@Injectable()
export class CountriesService {
  private readonly NAGER_URL = 'https://date.nager.at/api/v3';
  private readonly POPULATION_URL =
    'https://countriesnow.space/api/v0.1/countries/population';
  private readonly FLAG_URL =
    'https://countriesnow.space/api/v0.1/countries/flag/images';

  constructor(private readonly http: HttpService) {}

  async getAvailableCountries(): Promise<NagerCountryInfo[]> {
    try {
      const response$ = this.http.get<NagerCountryInfo[]>(
        `${this.NAGER_URL}/AvailableCountries`,
      );
      const response = await firstValueFrom(response$);
      return response.data;
    } catch (error: any) {
      throw new HttpException(
        'Failed to get countries',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getCountryInfo(code: string) {
    try {
      const nager$ = this.http.get<NagerCountryInfo>(
        `${this.NAGER_URL}/CountryInfo/${code}`,
      );
      const nagerResponse = await firstValueFrom(nager$);
      const { officialName, countryCode, borders } = nagerResponse.data;

      const population$ = this.http.post<PopulationResponse>(
        this.POPULATION_URL,
        {
          country: officialName,
        },
      );
      const populationResponse = await firstValueFrom(population$);
      const populationCounts = populationResponse.data.data.populationCounts;

      const flag$ = this.http.post<FlagResponse>(this.FLAG_URL, {
        country: officialName,
      });
      const flagResponse = await firstValueFrom(flag$);
      const flagUrl = flagResponse.data.data.flag;

      return {
        countryCode: code,
        officialName,
        flagUrl,
        borderCountries: borders,
        populationCounts,
      };
    } catch (error: any) {
      throw new HttpException(
        'Failed to get country info',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
