import { styled, TextField } from '@mui/material';
import React, { forwardRef } from 'react';

const StyledTextField = styled(TextField)(({ theme }) => ({
   // '& .MuiOutlinedInput-input': {
   //    fontWeight: 500,
   //    color: theme.palette.text.primary,
   // },
   // '& .MuiOutlinedInput-notchedOutline': {
   //    borderRadius: '4px',
   //    border: '2px solid',
   //    borderColor: 'green'
   // },
   // '& .MuiOutlinedInput-root.Mui-disabled .MuiOutlinedInput-notchedOutline': {
   //    borderColor: '#ffd05b',
   //    border: '2px solid',
   // },
   '& .MuiOutlinedInput-root': {
      '& fieldset': {
         borderColor: '#ffd05b',
         borderWidth: '3px',
      },
      '&:hover fieldset': {
         borderColor: '#ffd05b',
      },
      '&.Mui-focused fieldset': {
         borderColor: '#ffd05b',
      },
   },
}));

const LightTextField = (props, ref) => {
   return <StyledTextField {...props} inputRef={ref} />;
};

export default forwardRef(LightTextField);
