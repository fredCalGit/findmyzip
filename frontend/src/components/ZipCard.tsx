import { Card, CardContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Form } from "./Form";
import { Header } from "./Header";

export const ZipCard = () => {
  const [queryVariables, setQueryVariables] = useState({
    country: "US",
    zipCode: "",
  });

  useEffect(() => {
    console.log(queryVariables.country, queryVariables.zipCode);
  }, [queryVariables.country, queryVariables.zipCode]);
  return (
    <Card sx={{ height: 345 }}>
      <Header />
      <CardContent>
        <Form handleSubmit={setQueryVariables} />
      </CardContent>
    </Card>
  );
};
