import { Button } from '@mui/material';
import { styled } from '@mui/system';
import React from 'react';

const CustomButton = styled(Button)(({ theme, variant }) => ({
   backgroundColor:
      variant === 'secondary' ? 'transparent' : theme.palette.primary.main,
   color: theme.palette.primary.dark,
   boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.1)',
   cursor: 'pointer !important',
   padding: variant === 'secondary' ? '6px 16px' : '8px 18px',
   border: variant === 'secondary' ? '2px solid #4D4D4D' : 'none',
   '&:hover': {
      backgroundColor: theme.palette.primary.main,
      boxShadow: '0px 0px 5px 1px rgba(0,0,0,0.1)',
      border: variant === 'secondary' ? '2px solid transparent' : 'none',
   },
   boxSizing: 'border-box',
}));

const PrimaryButton = ({
   children,
   sx,
   onClick,
   IconEnd,
   IconStart,
   variant,
   disabled = false,
   ...rest
}) => {
   if (IconEnd) {
      return (
         <CustomButton
            sx={{ ...sx }}
            onClick={onClick}
            endIcon={<IconEnd />}
            variant={variant}
            {...rest}
            disabled={disabled}
         >
            {children}
         </CustomButton>
      );
   }

   if (IconStart) {
      return (
         <CustomButton
            sx={{ ...sx }}
            onClick={onClick}
            startIcon={<IconStart />}
            {...rest}
            variant={variant}
            disabled={disabled}
         >
            {children}
         </CustomButton>
      );
   }

   return (
      <CustomButton
         sx={{ display: 'block', ...sx }}
         onClick={onClick}
         {...rest}
         variant={variant}
         disabled={disabled}
      >
         {children}
      </CustomButton>
   );
};

export default PrimaryButton;
