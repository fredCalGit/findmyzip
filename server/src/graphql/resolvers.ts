export const resolvers = {
  Query: {
    location: async (_source, { country, postCode }, { dataSources }) => {
      try {
        let result = await dataSources.locationsAPI.getLocation({
          country: country.toUpperCase(),
          postCode,
        });
        let response = {
          ...result,
          postalCode: result["post code"],
          countryAbbreviation: result["country abbreviation"],
          places: result.places.map((place) => {
            return {
              ...place,
              placeName: place["place name"],
              stateAbbreviation: place["state abbreviation"],
            };
          }),
        };
        return response;
      } catch (err) {
        console.log(err);
        throw new Error("ZipCode not found!");
      }
    },
  },
};
