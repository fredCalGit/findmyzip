import { gql } from "apollo-server";

export const typeDefs = gql`
  type Location {
    postCode: String
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
    location(country: String, postCode: String): Location
  }
`;
