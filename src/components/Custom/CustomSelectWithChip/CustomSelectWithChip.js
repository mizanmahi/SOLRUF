import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

const ITEM_HEIGHT = 38;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
};

const names = [
   'Oliver Hansen',
   'Van Henry',
   'April Tucker',
   'Ralph Hubbard',
   'Omar Alexander',
   'Carlos Abbott',
   'Miriam Wagner',
   'Bradley Wilkerson',
   'Virginia Andrews',
   'Kelly Snyder',
];

function getStyles(name, personName, theme) {
   return {
      fontWeight:
         personName.indexOf(name) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightBold,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor:
         personName.indexOf(name) === -1
            ? 'transparent'
            : theme.palette.primary.main,
      width: '95%',
      margin: '4px auto',
      borderRadius: '8px',
      color: '#000000'
   };
}

function getStylesForIcon(name, personName, theme) {
   return {
      display: personName.indexOf(name) === -1 ? 'none' : 'block',
      color: 'green'
   };
}

export default function MultipleSelectChip() {
   const theme = useTheme();
   const [personName, setPersonName] = React.useState([]);

   console.log(personName);

   const handleChange = (event) => {
      const {
         target: { value },
      } = event;
      setPersonName(
         // On autofill we get a stringified value.
         typeof value === 'string' ? value.split(',') : value
      );
   };

   const [chipCount, setChipCount] = React.useState(0);
 

   return (
      <div>
         <FormControl sx={{ m: 1, width: 500 }}>
            <InputLabel id='demo-multiple-chip-label'>Filter</InputLabel>
            <Select
               labelId='demo-multiple-chip-label'
               id='demo-multiple-chip'
               multiple
               value={personName}
               onChange={handleChange}
               input={<OutlinedInput id='select-multiple-chip' label='Chip' variant='standard' />}
               renderValue={(selected) => (
                  <Box
                     sx={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        gap: 0.5,
                        alignItems: 'center',
                        overflow: 'hidden',
                     }}
                  >
                     {selected.map((value, i) => {
                        if(i < 3){
                           return (
                              <Chip
                                 key={value}
                                 label={value}
                                 sx={{ background: '#ffd05b' }}
                              />
                           );
                        }else{
                           
                           return `${chipCount} more...`;
                        }
                        
                     }).slice(0, 3)}
                  </Box>
               )}
               MenuProps={MenuProps}
            >
               {names.map((name) => (
                  <MenuItem
                     key={name}
                     value={name}
                     style={getStyles(name, personName, theme)}
                  >
                     {name}{' '}
                     <DoneIcon
                        style={getStylesForIcon(name, personName, theme)}
                     />
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
      </div>
   );
}
