import {
   FormControl,
   FormControlLabel,
   FormLabel,
   Radio,
   RadioGroup,
} from '@mui/material';
import React from 'react';

const SolrufRadio = ({ handleChange, values, value, label }) => {
   return (
      <FormControl component='fieldset'>
         {label && <FormLabel component='legend'>Gender</FormLabel>}

         <RadioGroup
            aria-label='gender'
            name='controlled-radio-buttons-group'
            value={value}
            onChange={handleChange}
         >
            {values.map(({ value, label }, index) => (
               <FormControlLabel
                  value={value}
                  control={<Radio />}
                  label={label}
               />
            ))}
         </RadioGroup>
      </FormControl>
   );
};

export default SolrufRadio;
