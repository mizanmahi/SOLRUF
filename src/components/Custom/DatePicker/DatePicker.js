import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import TextField from "../../TextField/TextField";
import { Box } from "@mui/material";

const DatePicker = ({ date, setDate, sx }) => {
  const handleChange = (newValue) => {
    setDate(newValue);
  };

  const readOnlyOnFocus = (e) => {
    console.log((e.target.readOnly = true));
  };

  return (
    <Box sx={{ maxWidth: { sm: "180px", xs: "100%" }, ...sx }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          disablePast
          label="Date"
          inputFormat="yyyy/MM/dd"
          value={date}
          onChange={handleChange}
          renderInput={(params) => (
            <TextField
              {...params}
              helperText={!date && `Select a date*`}
              error={!date}
              onFocus={readOnlyOnFocus}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default DatePicker;
