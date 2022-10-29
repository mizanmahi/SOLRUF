import { Button } from '@mui/material';
import React from 'react';
import './index.css';

export const AppTextInputButton = ({
  isButtonPresent,
  textArea,
  placeholder,
  className,
  buttonName,
  value,
  onChange,
  type,
  onClick,
  onUpload,
}) => {
  const [cursor, setCursor] = React.useState(null);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const input = ref.current;
    if (input) input.setSelectionRange(cursor, cursor);
  }, [ref, cursor, value]);

  const handleChange = (e) => {
    setCursor(e.target.selectionStart);
    onChange && onChange(e);
  };
  return (
    <div>
      <div>
        {textArea ? (
          <textarea
            className={`form-control text-area-style ${className}`}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            style={{
              height: '150px',
              borderRadius: '7px !important',
              fontFamily: 'inter',
              width: '100%',
              margin: '1rem 0',
              padding: '1rem',
            }}
          />
        ) : (
          <>
            <input
              type='text'
              className={`form-control border-right-none ${className}`}
              placeholder={placeholder}
              value={value}
              onChange={handleChange}
              style={{fontFamily: 'inter', width: '50%', padding: '0.5rem', margin: '0.5rem'}}
            />
            {isButtonPresent && (
              <button
                className='btn-outline-secondary save-button shadow-none'
                type={'button'}
                id='button-addon2'
                onClick={onClick}
              >
                {buttonName || 'Add'}
              </button>
            )}
            {type === 'file' && (
              <Button
                variant='contained'
                component='label'
                onChange={(e) => {
                  onUpload(e.target.files[0]);
                }}
              >
                Add
                <input type='file' hidden />
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
