import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import countries from "../utils/countriesList";
import { Box, Button } from "@mui/material";
import { SyntheticEvent, useEffect, useState } from "react";

interface FormProps {
  handleSubmit: ({
    country,
    postCode,
  }: {
    country: string;
    postCode: string;
  }) => void;
}
export const Form = ({ handleSubmit }: FormProps) => {
  const [country, setCountry] = useState("United States");
  const [zipCode, setZipCode] = useState("");

  const getCountryAlias = (name: string) => {
    const result = countries.filter(
      (country) => country.label.toLowerCase() === name.toLowerCase()
    );
    return result[0].value;
  };
  const handleCountryChange = (newValue: string) => {
    if (newValue) {
      setCountry(newValue);
    }
  };

  const handleZipChange = (newValue: string) => {
    setZipCode(newValue);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Autocomplete
        disablePortal
        id="country-input"
        options={countries
          .map((country) => {
            return country.label;
          })
          .sort((a, b) => -b)}
        autoHighlight
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Choose a Country" />
        )}
        value={country}
        inputValue={country}
        onChange={(event, value) => {
          if (value) handleCountryChange(value);
        }}
      />
      <TextField
        id="zipcode-input"
        label="Enter Zip-Code"
        variant="outlined"
        sx={{ width: 300 }}
        value={zipCode}
        onChange={(event) => handleZipChange(event.target.value)}
      />
      <Button
        variant="outlined"
        onClick={() => {
          if (zipCode)
            handleSubmit({
              country: getCountryAlias(country),
              postCode: zipCode,
            });
        }}
      >
        Search
      </Button>
    </Box>
  );
};
