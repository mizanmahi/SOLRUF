import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, TextField } from "@mui/material";

const DatePickerWithTime = ({ value, setValue, label, sx }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  console.log(value);
  return (
    <Box sx={{ ...sx }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          label={label || "Select Time"}
          value={value}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#ffd05b",
                    borderWidth: "2px",
                  },
                  "&:hover fieldset": {
                    borderColor: "#ffd05b",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#ffd05b",
                  },
                },
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePickerWithTime;
