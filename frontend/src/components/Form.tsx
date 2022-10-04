import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import countries from "../utils/countriesList";
import { Box, Button } from "@mui/material";

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

  const isValidUSZip = (zipcode: string) =>
    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

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
        sx={{ width: 360 }}
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
          if (getCountryAlias(country) === "US") {
            if (!isValidUSZip(zipCode)) {
              alert("Invalid ZipCode!");
            } else {
              handleSubmit({
                country: getCountryAlias(country),
                postCode: zipCode,
              });
            }
          } else if (zipCode)
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
