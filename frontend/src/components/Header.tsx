import React, { useContext } from "react";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { CardHeader, IconButton, useTheme } from "@mui/material";
import { ColorModeContext } from "../App";

export const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <CardHeader
      title="whereZip"
      action={
        <IconButton
          sx={{ ml: 1 }}
          onClick={colorMode.toggleColorMode}
          color="inherit"
        >
          {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      }
    ></CardHeader>
  );
};
