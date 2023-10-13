import { InputLabel, MenuItem, TextField } from "@mui/material";
import Select, { type SelectChangeEvent } from "@mui/material/Select";
import { ChangeEventHandler, type ReactNode } from "react";

interface SelectProps {
  label: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  options: {
    value: string;
    label: string;
  }[];
}

const SelectComponent: React.FC<SelectProps> = ({
  label,
  handleChange,
  options,
  value,
}) => {
  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        label={label}
        value={value}
        onChange={handleChange}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SelectComponent;
