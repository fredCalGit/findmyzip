import React from "react";
import { render } from "@testing-library/react";
import { ZipCard } from "../ZipCard";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../graphql";

test("renders the ZipCard", () => {
  const { container } = render(
    <ApolloProvider client={client}>
      <ZipCard />
    </ApolloProvider>
  );
  expect(container).toMatchSnapshot();
});
