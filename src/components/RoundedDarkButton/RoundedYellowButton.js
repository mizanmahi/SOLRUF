import { styled } from '@mui/system';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Button = styled('button')(({ theme }) => ({
   background: '#FFD05B',
   color: '#000000',
   borderRadius: theme.spacing(4),
   minWidth: '18rem',
   //    maxWidth: '20rem',
   height: '50px',
   border: '3px solid #4D4D4D',
   outline: 0,
   position: 'relative',
   fontSize: '1rem',
   fontWeight: 'bold',
   boxShadow :  '0px 4px 8px rgba(0, 0, 0, 0.18)',
   // letterSpacing: '1px',
   padding: '0 70px 0 60px',
   span: {
      position: 'absolute',
      right: '5px',
      top: '3px',
      background: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '50%',
      marginLeft: '1rem',
      '&:hover': {
         '& svg': {
            transform: 'translateX(1px)',
         },
      },
      '& svg': {
         color: '#000000',
      },
   },
}));

const RoundedYellowButton = ({ title,onClick }) => {
   return (
      <>
         <Button onClick={onClick}>
            {title}
            <span>
               <ArrowForwardIcon />
            </span>
         </Button>
      </>
   );
};

export default RoundedYellowButton;
