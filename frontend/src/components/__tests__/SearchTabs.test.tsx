import React from "react";
import { render } from "@testing-library/react";
import { SearchTabs } from "../SearchTabs";

const mockData = {
  location: {
    country: "United States",
    countryAbbreviation: "US",
    postCode: "90211",
    places: [
      {
        placeName: "Beverly Hills",
        state: "California",
        stateAbbreviation: "CA",
        latitude: "34.0652",
        longitude: "-118.383",
      },
    ],
  },
};

const mockVariables = {
  country: "US",
  postCode: "90211",
};
const mockCachedVariables = [mockVariables];

test("renders the SearchTab", () => {
  const setState = jest.fn();

  const { container } = render(
    <SearchTabs
      data={mockData}
      cachedVariables={mockCachedVariables}
      setQueryVariables={setState}
    />
  );
  expect(container).toMatchSnapshot();
});
