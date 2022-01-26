import React from 'react';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import { InputAdornment } from '@mui/material';
import { forwardRef } from 'react';

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
   marginTop: '.2rem',
   '& .MuiFormHelperText-root': {
      
   }
}));

const SolrufTextField = ({
   style,
   sx,
   iconText,
   onChange,
   value,
   size,
   ...props
}, ref) => {
   if (iconText) {
      return (
         <ConsultTextField
         inputRef={ref}
            {...props}
            style={{ ...style }}
            sx={{ ...sx }}
            InputProps={{
               endAdornment: (
                  <InputAdornment position='start'>{iconText}</InputAdornment>
               ),
            }}
            size={size ? size : 'small'}
            onChange={onChange}
            value={value}
         />
      );
   }

   return (
      <>
         <ConsultTextField
         inputRef={ref}
            {...props}
            style={{ ...style }}
            sx={{ ...sx }}
            onChange={onChange}
            value={value}
            size={size ? size : 'normal'}
         />
      </>
   );
};

export default forwardRef(SolrufTextField);
