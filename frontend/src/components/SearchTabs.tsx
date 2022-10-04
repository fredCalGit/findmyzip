import React from "react";
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
import { client } from "../graphql";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface SearchTabsProps {
  data: {
    location: {
      country: string;
      countryAbbreviation: string;
      postCode: string;
      places: [
        {
          placeName: string;
          state: string;
          stateAbbreviation: string;
          latitude: string;
          longitude: string;
        }
      ];
    };
  };
  cachedVariables?: { country: string; postCode: string }[] | null;
}

export const SearchTabs = ({
  data,
  cachedVariables = null,
}: SearchTabsProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: "50vh",
        margin: "20px",
      }}
    >
      {data?.location && (
        <>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            <Tab
              key={`${data.location.country}-${data.location.postCode}`}
              label={`Search #${value + 1}`}
              {...a11yProps(value)}
            />
          </Tabs>

          <TabPanel value={value} index={value}>
            <Typography variant="h5">
              {data.location.country}, {data.location.countryAbbreviation}
            </Typography>
            <Typography>Zip Code: {data.location.postCode}</Typography>
            <br />
            {data.location.places.map((place, index) => {
              return (
                <Card>
                  <CardHeader title={place.placeName} />
                  <CardContent>
                    <Typography>
                      {place.state}, {place.stateAbbreviation}
                    </Typography>
                    <Typography>Latitude: {place.latitude}</Typography>
                    <Typography>Longitude: {place.longitude}</Typography>
                  </CardContent>
                </Card>
              );
            })}
          </TabPanel>
        </>
      )}
    </Box>
  );
};
