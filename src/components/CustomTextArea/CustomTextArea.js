import { styled } from '@mui/material';
import React, { forwardRef } from 'react';

const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '0 auto',
      border: '2px solid #FFD05B',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
   };
});

const CustomTextArea = ({placeholder, style, ...rest}, ref) => {
   return (
      <Textarea
         ref={ref}
         rows='5'
         placeholder={placeholder}
         style={{ marginTop: '1rem', ...style }}
         {...rest}
      ></Textarea>
   );
};

export default forwardRef(CustomTextArea);
