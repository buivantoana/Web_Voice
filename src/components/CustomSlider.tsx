import React, { useState } from "react";
import { Slider, Typography } from "@mui/material";
import { Box, styled } from "@mui/system";

const BarContainer = styled("div")({
  display: "flex",
  justifyContent: "end",
  alignItems: "flex-end",
  height: 40,
  gap: 2,
});

const Bar = styled("div")(({ active }: { active: boolean }) => ({
  width: 10,
  height: 7,
  backgroundColor: active ? "rgb(5 122 85)" : "#ccc",
  transition: "all 0.2s ease",
}));

const CustomSlider = styled(Slider)({
  color: "rgb(5 122 85)",
  height: 10,
  borderRadius: 5,
  "& .MuiSlider-thumb": {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    border: "2px solid #aaa",
  },
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-rail": {
    opacity: 0.5,
    backgroundColor: "#ccc",
  },
});

export default function VisualSlider({ 
  title, 
  onChange, 
  value, 
  min = 0, 
  max = 100 
}: { 
  title: string; 
  onChange: (value: number) => void; 
  value: number; 
  min?: number; 
  max?: number 
}) {
  const totalBars = 10;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "end",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={14} sx={{ lineHeight: ".8" }}>
          {title}
        </Typography>
        <BarContainer>
          {[...Array(totalBars)].map((_, i) => {
            const isActive = i < (value / max) * totalBars;
            const scale = (i + 1) / totalBars;
            console.log(isActive)
            return (
              <Bar
                key={i}
                active={isActive}
                style={{
                  transform: `scaleY(${0.5 + scale})`,
                  backgroundColor: isActive ? "rgb(5 122 85)" : "#eee",
                }}
              />
            );
          })}
      </BarContainer>
      </Box>
      <CustomSlider
        value={value}
        onChange={(_, val) => onChange(val as number)}
        min={min}
        max={max}
      />
    </div>
  );
}