import React, { useEffect, useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Card, CardContent, Typography } from "@mui/material";

import { Form } from "./Form";
import { Header } from "./Header";
import { SearchTabs } from "./SearchTabs";
import { client } from "../graphql";

export const ZipCard = () => {
  const [queryVariables, setQueryVariables] = useState<QueryVariables>({
    country: "US",
    postCode: "90201",
  });
  const [cachedVariables, setCachedVariables] = useState<
    QueryVariables[] | null
  >(null);

  const { loading, error, data } = useQuery(query, {
    variables: queryVariables,
    errorPolicy: "all",
  });

  const handleSubmit = ({
    country,
    postCode,
  }: {
    country: string;
    postCode: string;
  }) => {
    setQueryVariables({ country, postCode });
  };
  useEffect(() => {
    console.log(data);
    //    console.log(client.cache.readQuery({ query,  }));
  }, [data]);

  return (
    <Card sx={{ height: "80vh" }}>
      <Header />
      <CardContent>
        <Form handleSubmit={handleSubmit} />
        <SearchTabs data={data} />
      </CardContent>
    </Card>
  );
};

type QueryVariables = {
  country: string;
  postCode: string;
};
const query = gql`
  query GetLocations($country: String, $postCode: String) {
    location(country: $country, postCode: $postCode) {
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
`;
