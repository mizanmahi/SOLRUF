import { FormControl, InputLabel, Select } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const CustomSelect = ({
   value,
   changeHandler,
   children,
   name,
   label,
   sx,
   defaultValue,
   ...rest
}) => {
   return (
      <Box sx={{ minWidth: 120, ...sx }}>
         <FormControl
            fullWidth
            sx={{
               '& fieldset': { border: '2px solid #ffd05b' },
               '&:hover fieldset': { borderColor: '#ffd05b' },
            }}
         >
            <InputLabel id='demo-simple-select-label'>{label}</InputLabel>
            <Select
            {...rest}
               name={name}
               labelId='demo-simple-select-label'
               value={value}
               label='Select category'
               onChange={changeHandler}
               sx={{
                  background: '#fff',
                  '&:hover .MuiOutlinedInput-root': { borderColor: '#ffd05b' },
               }}
               //    size='small'
            >
               {children}
            </Select>
         </FormControl>
      </Box>
   );
};

export default CustomSelect;
