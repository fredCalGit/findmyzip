import { gql } from "apollo-server";

export const typeDefs = gql`
  type Location {
    postalCode: String
    country: String
    countryAbbreviation: String
    places: [Place]
  }

  type Place {
    placeName: String
    state: String
    stateAbbreviation: String
    longitude: String
    latitude: String
  }

  type Query {
    location(country: String, postalCode: String): Location
  }
`;
