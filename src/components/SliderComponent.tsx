import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}°C`;
}

interface RangeSliderProps {
  step: number;
}

export default function RangeSlider(props: RangeSliderProps) {
  const [value, setValue] = React.useState<number>(props.step);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    setValue(newValue as number);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        disabled
        getAriaLabel={() => "Disabled slider"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
      />
    </Box>
  );
}
