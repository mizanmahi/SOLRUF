import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '../../TextField/TextField';
import { Box } from '@mui/material';

const DatePicker = ({ date, setDate }) => {
   const handleChange = (newValue) => {
      setDate(newValue);
   };

   return (
      <Box sx={{ maxWidth: '300px' }}>
         <LocalizationProvider dateAdapter={DateAdapter}>
            <DesktopDatePicker
               label='Date'
               inputFormat='MM/dd/yyyy'
               value={date}
               onChange={handleChange}
               renderInput={(params) => <TextField {...params} />}
            />
         </LocalizationProvider>
      </Box>
   );
};

export default DatePicker;
