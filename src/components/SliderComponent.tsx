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

  console.log(value);

  return (
    <Box sx={{ width: 200 }}>
      <Slider
        getAriaLabel={() => "Disabled slider"}
        value={isNaN(value) ? 0 : value}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          color: "black",
          background:
            "linear-gradient(to right, #00ff00, #ffff00, #ff0000, #ff0000)",
        }}
      />
    </Box>
  );
}
