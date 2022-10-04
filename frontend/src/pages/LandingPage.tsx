import React, { useContext } from "react";
import { Box, Card, Container, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { ColorModeContext } from "../App";
import { Header } from "../components/Header";
import { ZipCard } from "../components/ZipCard";

export const LandingPage = () => {
  return (
    <Container maxWidth="md">
      <ZipCard />
    </Container>
  );
};
