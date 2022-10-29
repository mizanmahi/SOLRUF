import { styled } from '@mui/system';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
const Button = styled('button')(({ theme }) => ({
   background: '#4D4D4D',
   color: theme.palette.primary.main,
   borderRadius: theme.spacing(4),
   minWidth: '18rem',
   height: '50px',
   border: 0,
   outline: 0,
   position: 'relative',
   fontSize: '1rem',
   fontWeight: 500,
   padding: '0 70px 0 60px',
   textTransform: 'capitalize',
   cursor: 'pointer',
   '&:hover': {
      '& svg': {
         transform: 'translateX(2px)',
      },
      boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
   },
   span: {
      position: 'absolute',
      right: '5px',
      top: '5px',
      background: theme.palette.primary.main,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '2.5rem',
      width: '2.5rem',
      borderRadius: '50%',
      marginLeft: '1rem',

      '& svg': {
         color: '#4D4D4D',
      },
   },
}));

const RoundedDarkButton = ({ title, style, onClick }) => {
   return (
      <>
         <Button style={{ ...style }} onClick={onClick}>
            {title}
            <span>
               <ArrowForwardIcon />
            </span>
         </Button>
      </>
   );
};

export default RoundedDarkButton;
