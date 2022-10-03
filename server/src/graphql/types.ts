export interface InputArgs {
  country: string;
  postCode: string;
}

export type Location = {
  postCode: string;
  country: string;
  countryAbbreviation: string;
  places: [Place];
};

export type Place = {
  placeName: string;
  state: string;
  stateAbbreviation: string;
  longitude: string;
  latitude: string;
};

export type LocationResult = {
  "post code": string;
  country: string;
  "country abbreviation": string;
  places: [PlaceResult];
};

export type PlaceResult = {
  "place name": string;
  state: string;
  "state abbreviation": string;
  longitude: string;
  latitude: string;
};
