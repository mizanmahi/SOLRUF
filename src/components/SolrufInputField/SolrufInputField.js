import {
   FormControl,
   IconButton,
   InputAdornment,
   InputLabel,
   OutlinedInput,
} from '@mui/material';
import React from 'react';

const SolrufInputField = ({ iconText, label, type }) => {
   return (
      <FormControl sx={{ m: 1, width: '25ch' }} variant='outlined'>
         <InputLabel htmlFor='outlined-adornment-password'>{label}</InputLabel>
         <OutlinedInput
            id='outlined-adornment-password'
            type={type}
            endAdornment={
               <InputAdornment position='end'>
                  <IconButton
                     aria-label='toggle password visibility'
                     edge='end'
                  >
                     {iconText}
                  </IconButton>
               </InputAdornment>
            }
            label={label}
         />
      </FormControl>
   );
};

export default SolrufInputField;
