interface LocationType {
  name: string;
  country: string;
  region: string;
  lon: string;
  lat: string;
  localtime: string;
  localtime_epoch: number;
  timezone_id: string;
  utc_offset: string;
}

interface TemperatureType {
  cloudcover: number;
  feelslike: number;
  humidity: number;
  is_day: string;
  observation_time: string;
  precip: number;
  pressure: number;
  temperature: number;
  uv_index: number;
  visibility: number;
  weather_code: number;
  weather_descriptions: string[];
  weather_icons: string[];
  wind_degree: number;
  wind_dir: string;
  wind_speed: number;
}

interface ActionType {
  type: string;
  payload?: any;
}

interface CityType {
  countryCode: string;
  latitude: string;
  longitude: string;
  name: string;
  stateCode: string;
}

interface StateType {
  cities: CityType[];
  countryCode: string;
  isoCode: string;
  latitude: string;
  longitude: string;
  name: string;
}
interface PlaceType {
  state: StateType | {};
  city: CityType | {};
  cityIndex: number | null;
}

interface RootStackParamList {
  PlacesStack: {
    placeSelected: PlaceType | null;
  };
  DisplayTempScreen: undefined;
}

export type {
  LocationType,
  TemperatureType,
  ActionType,
  StateType,
  CityType,
  PlaceType,
  RootStackParamList,
};
