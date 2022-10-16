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
  const [country, setCountry] = useState(countries[65]);
  const [zipCode, setZipCode] = useState("");

  const isValidUSZip = (zipcode: string) =>
    /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zipcode);

  const handleCountryChange = (
    newValue: { value: string; label: string } | null
  ) => {
    newValue && setCountry(newValue);
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
        id='country-input'
        options={countries}
        autoHighlight
        sx={{ width: 360 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Choose a Country'
            value={country.label}
          />
        )}
        value={country}
        onChange={(event, value) => {
          handleCountryChange(value);
        }}
      />
      <TextField
        id='zipcode-input'
        label='Enter Zip-Code'
        variant='outlined'
        sx={{ width: 300 }}
        value={zipCode}
        onChange={(event) => handleZipChange(event.target.value)}
      />
      <Button
        variant='outlined'
        onClick={() => {
          if (country.value === "US") {
            if (!isValidUSZip(zipCode)) {
              alert("Invalid ZipCode!");
            } else {
              handleSubmit({
                country: country.value,
                postCode: zipCode,
              });
            }
          } else if (zipCode)
            handleSubmit({
              country: country.value,
              postCode: zipCode,
            });
        }}
      >
        Search
      </Button>
    </Box>
  );
};
