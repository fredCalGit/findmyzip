import React, {
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useState,
} from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Skeleton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

export interface SearchTabsProps {
  data: {
    location: {
      country: string;
      countryAbbreviation: string;
      postCode: string;
      places: {
        placeName: string;
        state: string;
        stateAbbreviation: string;
        latitude: string;
        longitude: string;
      }[];
    };
  };
  cachedVariables?: { country: string; postCode: string }[] | null;
  setQueryVariables: Dispatch<
    SetStateAction<{ country: string; postCode: string } | null>
  >;
}

export const SearchTabs = ({
  data,
  cachedVariables = null,
  setQueryVariables,
}: SearchTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        {cachedVariables && (
          <Tabs
            value={cachedVariables.length > 0 ? cachedVariables.length - 1 : 0}
            onChange={handleChange}
            aria-label='basic tabs example'
          >
            {data ? (
              cachedVariables &&
              cachedVariables.map((item, index) => {
                return (
                  <Tab
                    key={`${item.country}-${item.postCode}-${index}`}
                    label={`${item.country} - ${item.postCode}`}
                    onClick={() => {
                      setQueryVariables(cachedVariables[index]);
                    }}
                    {...a11yProps(index)}
                  />
                );
              })
            ) : (
              <Skeleton />
            )}
          </Tabs>
        )}
      </Box>

      {data ? (
        cachedVariables &&
        cachedVariables.map((item, index) => {
          return (
            <TabPanel
              value={value}
              index={index}
              key={`${item.postCode}-${item.country}-${index}`}
            >
              {data.location ? (
                <>
                  <Typography variant='h5'>
                    Country: {data.location.country} -{" "}
                    {data.location.countryAbbreviation}
                  </Typography>
                  <Typography variant='h5'>
                    ZipCode: {data.location.postCode}
                  </Typography>
                </>
              ) : (
                <Typography color='error' variant='h5'>
                  Zip Code not found!
                </Typography>
              )}

              {data?.location?.places ? (
                data.location.places.map((item, index) => {
                  return (
                    <Card key={`${item.longitude}-${item.latitude}`}>
                      <CardHeader
                        title={`${item.placeName} - ${item.stateAbbreviation}`}
                      />
                      <CardContent>
                        <Typography>State: {item.state}</Typography>
                        <Typography>Latitude: {item.latitude}</Typography>
                        <Typography>Longitude: {item.longitude}</Typography>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <Typography color='error'>Enter Valid Zip Code!</Typography>
              )}
            </TabPanel>
          );
        })
      ) : (
        <Skeleton />
      )}
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
