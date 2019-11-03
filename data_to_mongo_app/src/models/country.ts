export interface Currency {
    code: String;
    name: String;
    symbol: String;
  }
  
  export interface Language {
    iso639_1: String;
    iso639_2: String;
    name: String;
    nativeName: String;
  }
  
  export interface Translations {
    de: String;
    es: String;
    fr: String;
    ja: String;
    it: String;
    br: String;
    pt: String;
    nl: String;
    hr: String;
    fa: String;
  }
  
  export interface RegionalBloc {
    acronym: String;
    name: String;
    otherAcronyms: any[];
    otherNames: any[];
  }
  
  export interface Country {
    name: String;
    topLevelDomain: String[];
    alpha2Code: String;
    alpha3Code: String;
    callingCodes: String[];
    capital: String;
    altSpellings: String[];
    region: String;
    subregion: String;
    population: Number;
    latlng: Number[];
    demonym: String;
    area: Number;
    gini: Number;
    timezones: String[];
    borders: String[];
    nativeName: String;
    numericCode: String;
    currencies: Currency[];
    languages: Language[];
    translations: Translations;
    flag: String;
    regionalBlocs: RegionalBloc[];
    cioc: String;
  }