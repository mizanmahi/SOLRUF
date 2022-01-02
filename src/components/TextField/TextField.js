import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';

const ConsultTextField = styled(TextField)(({ theme }) => ({
   '& label.Mui-focused': {
      color: theme.palette.primary.dark,
   },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: theme.palette.primary.main,
         borderWidth: '2px',
      },
      '&:hover fieldset': {
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderColor: theme.palette.primary.main,
      },
   },
   width: '100%',
   marginTop: '1rem',
}));

const SolrufTextField = ({ style, sx, iconText, ...props }) => {
   if (iconText) {
      return (
         <ConsultTextField
            {...props}
            style={{ ...style }}
            sx={{ ...sx }}
            InputProps={{
               endAdornment: (
                  <InputAdornment position='start'>{iconText}</InputAdornment>
               ),
            }}
         />
      );
   }

   return (
      <>
         <ConsultTextField {...props} style={{ ...style }} sx={{ ...sx }} />
      </>
   );
};

export default SolrufTextField;
