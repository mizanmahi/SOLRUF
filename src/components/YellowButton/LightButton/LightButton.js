import React from 'react';

const LightButton = ({ onClick, children, style }) => {
   return (
      <button
         onClick={onClick}
         style={{
             boxSizing: 'border-box',
            border: `2px solid #FFD05B`,
            padding: '.65rem 1.8rem',
            color: '#4d4d4d',
            fontWeight: 600,
            borderRadius: '5px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',

            ...style,
         }}
      >
         {children}
      </button>
   );
};

export default LightButton;
