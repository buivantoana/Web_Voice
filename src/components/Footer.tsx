import React from "react";
import "../App.css";
import logo from "../images/logo4.png";
import { Box, Button, Typography, useTheme } from "@mui/material";

const Footer = () => {
  const theme: any = useTheme();
  return (
    <Box
      display={{ xs: "none", md: "flex" }}
      justifyContent={"space-between"}
      alignItems={"center"}
      px={"10%"}
      py={"15px"}>
      <Typography>
        © Copyright 2024, Text To Speech OpenAI . Version 1.1.0
      </Typography>
      <Typography>
        Liên hệ với chúng tôi:{" "}
        <span style={{ color: theme.palette.active.main, fontWeight: "bold" }}>
          {" "}
          support@gmv.vn
        </span>
      </Typography>
    </Box>
  );
};

export default Footer;
