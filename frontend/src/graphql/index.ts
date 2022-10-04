import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

client
  .query({
    query: gql`
      query GetLocations($country: String, $postCode: String) {
        location(country: $country, postCode: $zipCode) {
          postCode
          country
          countryAbbreviation
          places {
            placeName
            state
            stateAbbreviation
            longitude
            latitude
          }
        }
      }
    `,
  })
  .then((result) => console.log(result));
