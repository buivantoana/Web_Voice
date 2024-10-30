import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography, useTheme } from "@mui/material";

const CustomTextField = ({ label }: any) => {
  const theme: any = useTheme();
  const [value, setValue] = useState("");

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        ".search-input input": {
          padding: "5px 15px !important",
          width: "100%",
        },
        ".search-input": {
          width: "100%",
        },
      }}>
      <Typography my={"5px"} fontWeight={"500"}>
        {label}
      </Typography>
      <TextField
        className='search-input'
        id='demo-helper-text-aligned'
        size='small'
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "#dddddd", // Màu viền khi không có focus
            },
            "&:hover fieldset": {
              borderColor: "transparent", // Màu viền khi hover
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.active.main, // Màu viền khi focused
            },
          },
          fontSize: "16px",
        }}
      />
    </Box>
  );
};

export default CustomTextField;
