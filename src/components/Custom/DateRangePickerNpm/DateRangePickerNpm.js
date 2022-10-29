import { Box } from '@mui/material';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';

import React from 'react';

const DateRangePickerNpm = ({mobileDate, onChange}) => {
  

   console.log({mobileDate})

   return (
      <Box sx={{width: '100%'}}>
         <DateRangePicker onChange={onChange} value={mobileDate} className='dateRangePickerNpm' />
      </Box>
   );
};

export default DateRangePickerNpm;
