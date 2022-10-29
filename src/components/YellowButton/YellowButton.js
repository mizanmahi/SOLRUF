import React from 'react';

const YellowButton = ({ onClick, children, style, loading, ...rest }) => {
  return (
    <>
      <button
        {...rest}
        type='submit'
        onClick={onClick}
        style={{
          background: `#FFD05B`,
          padding: '.8rem 1.8rem',
          color: '#4d4d4d',
          fontWeight: 600,
          borderRadius: '5px',
          border: 'none',
          display: 'block',
          cursor: 'pointer',
          boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.10)',
          ...style,
          '&:hover': {
            background: `#e7bc51`,
          },
        }}
      >
        {children}
      </button>
    </>
  );
};

export default YellowButton;
