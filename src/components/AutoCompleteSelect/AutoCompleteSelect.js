import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutoCompleteSelect({
   options,
   value,
   setValue,
   label,
   style,
   error,
   errorText,
   formValidation,
   disabled,
   name,
   notAdd,
   sx,
   ...rest
}) {
   return (
      <>
         <Autocomplete
            sx={{ width: '100%', ...sx }}
            {...rest}
            disabled={disabled}
            id={name}
            size='small'
            value={value}
            onChange={(event, newValue) => {
               if (typeof newValue === 'string') {
                  setValue({
                     name: newValue,
                  });
               } else if (newValue && newValue.inputValue) {
                  // Create a new value from the user input
                  setValue({
                     name: newValue.inputValue,
                  });
               } else {
                  setValue(newValue);
               }
            }}
            filterOptions={(options, params) => {
               const filtered = filter(options, params);

               const { inputValue } = params;
               // Suggest the creation of a new value
               const isExisting = options.some(
                  (option) => inputValue === option.name
               );
               if (!notAdd) {
                  if (inputValue !== '' && !isExisting) {
                     filtered.push({
                        inputValue,
                        name: `Add "${inputValue}"`,
                     });
                  }
               }

               return filtered;
            }}
            name={formValidation?.name}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            options={options}
            getOptionLabel={(option) => {
               // Value selected with enter, right from the input
               if (typeof option === 'string') {
                  return option;
               }
               // Add "xxx" option created dynamically
               if (option.inputValue) {
                  return option.inputValue;
               }
               // Regular option
               return option.name;
            }}
            renderOption={(props, option) => <li {...props}>{option.name}</li>}
            freeSolo
            renderInput={(params) => (
               <>
                  <TextField
                     {...formValidation}
                     {...params}
                     label={label}
                     sx={{
                        '& fieldset': { border: '2px solid #ffd05b' },
                     }}
                  />
                  {error && (
                     <div
                        className='text-danger mt-1'
                        style={{
                           fontSize: '0.8rem',
                        }}
                     >
                        {errorText}
                     </div>
                  )}
               </>
            )}
         />
      </>
   );
}
