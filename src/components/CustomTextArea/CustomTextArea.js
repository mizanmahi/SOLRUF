import { Box, styled } from '@mui/material';
import React, { forwardRef } from 'react';
import CustomErrorText from '../CustomErrorText/CustomErrorText';

const Wrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   width: '100%',
   flex: 1,
}));

const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '0 auto',
      border: '2px solid #FFD05B',
      borderRadius: '5px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
      '&::placeholder': {
         fontSize: '1rem',
         color: 'rgba(0,0,0,0.67)',
      }
   };
});

const CustomTextArea = (
   { placeholder, style, rows, errorMessage, ...rest },
   ref
) => {
   return (
      <Wrapper>
         <Textarea
            ref={ref}
            rows={rows ? rows : 4}
            placeholder={placeholder}
            style={{ marginTop: '1rem', ...style }}
            {...rest}
         ></Textarea>
         <CustomErrorText
            errorMessage={errorMessage}
            sx={{ position: 'absolute', color: '#E21F30', bottom: '-18px' }}
         />
      </Wrapper>
   );
};

export default forwardRef(CustomTextArea);
