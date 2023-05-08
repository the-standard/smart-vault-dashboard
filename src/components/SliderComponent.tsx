import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

function valuetext(value: number) {
  return `${value}°C`;
}

interface RangeSliderProps {
  step: number;
}

export default function RangeSlider(props: RangeSliderProps) {
  const value = props.step;

  return (
    <Box sx={{ width: 300 }}>
      <Slider
        getAriaLabel={() => "Disabled slider"}
        value={value}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          color: "red",
        }}
      />
    </Box>
  );
}
