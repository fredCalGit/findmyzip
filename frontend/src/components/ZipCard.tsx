import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import { Form } from "./Form";
import { Header } from "./Header";
import { SearchTabs } from "./SearchTabs";

export const ZipCard = () => {
  const [queryVariables, setQueryVariables] = useState<QueryVariables>({
    country: "US",
    postCode: "0000000",
  });
  const [cachedVariables, setCachedVariables] = useState<
    QueryVariables[] | null
  >(null);

  const { data } = useQuery(query, {
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

    if (!cachedVariables) {
      setCachedVariables([{ country, postCode }]);
    } else {
      if (cachedVariables.length >= 5) {
        cachedVariables.splice(0, 1);
        setCachedVariables([...cachedVariables, { country, postCode }]);
      } else {
        setCachedVariables([...cachedVariables, { country, postCode }]);
      }
    }
  };

  return (
    <Card sx={{ height: "80vh" }}>
      <Header />
      <CardContent>
        <Form handleSubmit={handleSubmit} />
        <CardActions>
          <Button
            size="small"
            onClick={() => setCachedVariables(null)}
            disabled={!cachedVariables}
            color="error"
          >
            Clear History
          </Button>
        </CardActions>

        <SearchTabs
          data={data}
          cachedVariables={cachedVariables}
          setQueryVariables={setQueryVariables}
        />
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
