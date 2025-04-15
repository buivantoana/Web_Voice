import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const CustomTextField = ({ label, setValue, value, type }: any) => {
  const theme: any = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const isPassword = type === "password";

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
        onChange={handleChange}
        type={isPassword && !showPassword ? "password" : "text"}
        value={value}
        className='search-input'
        id='demo-helper-text-aligned'
        size='small'
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "25px",
            backgroundColor: "white",
            "& fieldset": {
              borderColor: "#dddddd",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.active.main,
            },
          },
          fontSize: "16px",
        }}
        InputProps={{
          endAdornment: isPassword ? (
            <InputAdornment position='end'>
              <IconButton onClick={togglePasswordVisibility} edge='end'>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ) : null,
        }}
      />
    </Box>
  );
};

export default CustomTextField;
