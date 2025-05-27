export interface PopulationCount {
  year: string;
  value: string;
}

export interface PopulationResponse {
  error: boolean;
  msg: string;
  data: {
    populationCounts: PopulationCount[];
  };
}

export interface FlagItem {
  name: string;
  iso2: string;
  iso3: string;
}

export interface FlagResponse {
  error: boolean;
  msg: string;
  data: {
    flag: string;
    data: FlagItem;
  };
}

export interface NagerCountryInfo {
  officialName: string;
  countryCode: string;
  borders: string[];
}
