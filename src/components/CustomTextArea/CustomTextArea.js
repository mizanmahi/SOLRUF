import { styled } from '@mui/material';
import React from 'react';

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

const CustomTextArea = ({placeholder, style, ...rest}) => {
   return (
      <Textarea
         rows='5'
         placeholder={placeholder}
         style={{ marginTop: '1rem', ...style }}
         {...rest}
      ></Textarea>
   );
};

export default CustomTextArea;
