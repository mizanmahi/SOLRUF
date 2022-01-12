import { FormControl, InputLabel, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CustomSelect = ({ value, changeHandler, children, name, label }) => {
   return (
      <Box sx={{ minWidth: 120 }}>
         <FormControl fullWidth>
            <InputLabel id='demo-simple-select-label'>
               {label}
            </InputLabel>
            <Select
               name={name}
               labelId='demo-simple-select-label'
               value={value}
               label='Select category'
               onChange={changeHandler}
               sx={{ background: '#fff' }}
               //    size='small'
            >
               {children}
            </Select>
         </FormControl>
      </Box>
   );
};

export default CustomSelect;
