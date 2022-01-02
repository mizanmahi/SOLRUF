import React from 'react';

const YellowButton = ({onClick,  children, style,}) => {
   return (
      <>
         <button
            onClick={onClick}
            style={{
               background: `#FFD05B`,
               padding: '.8rem 1.8rem',
               color: '#4d4d4d',
               fontWeight: 600,
               borderRadius: '5px',
               border: 'none',
               boxShadow: '0px 4px 5px rgba(0, 0, 0, 0.10)',
               ...style,
            }}
         >
            {children}
         </button>
      </>
   );
};

export default YellowButton;
