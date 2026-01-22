export interface Flags {
  alt: string;
  png: string;
  svg: string;
}

export interface CountryName {
  common    : string;
  official  : string;
}

export interface Country {
  flags     : Flags;
  name      : CountryName;
  capital   : string[];
  population: number;
  region    : string;
}

