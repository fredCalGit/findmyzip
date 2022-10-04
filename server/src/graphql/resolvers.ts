import { ApolloError } from "./errors";
import { InputArgs, LocationResult, PlaceResult } from "./types";

export const resolvers = {
  Query: {
    location: async (
      _source: any,
      { country, postCode }: InputArgs,
      { dataSources }: any
    ) => {
      try {
        let result: LocationResult = await dataSources.locationsAPI.getLocation(
          {
            country: country.toUpperCase(),
            postCode,
          }
        );

        let response = {
          ...result,
          postCode: result["post code"],
          countryAbbreviation: result["country abbreviation"],
          places: result.places.map((place: PlaceResult) => {
            return {
              ...place,
              placeName: place["place name"],
              stateAbbreviation: place["state abbreviation"],
            };
          }),
        };
        return response;
      } catch (err) {
        throw new ApolloError("Error");
      }
    },
  },
};
