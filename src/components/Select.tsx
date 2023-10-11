import { MenuItem, TextField } from "@mui/material";

interface SelectProps {
  id?: string;
  sx?: object;
  isActive?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
  ref?:React.Ref<HTMLDivElement>;
  value?: any;
  label?: string;
  handleChange?: any;
  options?: Array<any>;
  optName?: string;
  optValue?: string;
}

export function StyledSelect(props: SelectProps) {  

  const defaultSx = {
    background: "rgba(18, 18, 18, 0.5)",
    color: "white",
    fontSize: "2rem",
    fontWeight: "normal",
    fontFamily: "Poppins",
    height: "2.5rem",
    width: "100%",
    borderRadius: "10px",
    boxSizing: "unset",
    '.MuiOutlinedInput-input': {
      borderRadius: "10px",
    },
    '.MuiOutlinedInput-notchedOutline': {
      borderRadius: "10px",
      borderColor: "#8E9BAE",
    },
    '& .MuiInputBase-root': {
      height: "100%",
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root:hover:not(.Mui-disabled) .MuiOutlinedInput-notchedOutline': {
      borderColor: "#8E9BAE",
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: "#FFFFFF",
      borderWidth: "2px",
    },
    '.MuiInputLabel-root, .MuiInputLabel-root.Mui-disabled': {
      color: "#757575",
      fontFamily: "Poppins",
    },    
    '.MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.Mui-disabled': {
      color: "#757575",
      fontFamily: "Poppins",
      "-webkit-text-fill-color": "#757575",
    },
    '.MuiInputLabel-root.MuiInputLabel-shrink' : {
      color: "rgba(255,255,255,0)",
    },
    '.MuiInputLabel-root.Mui-focused' : {
      webkitTransition: "color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      transition: "color 100ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,max-width 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
      color: "rgba(255,255,255,0)",
    },
    '.MuiSvgIcon-root': {
      fill: "white !important",
    },
    '& legend': {
      width: "0px",
    },
    '.MuiSelect-select': {
      color: "#FFF",
    }
  };
  
  let useSx = defaultSx;

  if (props.sx) {
    useSx = {
      ...props.sx,
      ...defaultSx,
    }
  }

  return (
    <TextField
      id={props.id}
      value={props.value || ''}
      label={props.label || ''}
      onChange={props.handleChange || ''}
      sx={useSx}
      size="small"
      select
      disabled={props.disabled}
    >
      {props.options?.map((item, index) => {
        const useOptValue = item[props.optValue as keyof typeof props] || '';
        const useOptName = item[props.optName as keyof typeof props] || '';
        return (
          <MenuItem 
            key={index}
            value={useOptValue}
          >
            {useOptName}
          </MenuItem>
        );
      })}
    </TextField>
  )
}

export default StyledSelect;