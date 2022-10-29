
import {
  Checkbox,
  InputLabel,
  ListItemIcon,
  ListItemText,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import { MenuProps } from './utils';

function SelectCheckBox({ selected, setSelected, options }) {
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === 'all') {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };

  return (
    <FormControl style={{width: '100%', maxWidth: '250px'}}>
      <InputLabel id='mutiple-select-label'>Field View Points</InputLabel>
      <Select
        labelId='mutiple-select-label'
        multiple
        value={selected}
        onChange={handleChange}
        renderValue={(selected) => selected.join(', ')}
        MenuProps={MenuProps}
        style={{
          backgroundColor: '#fff',
        }}
        label='Multiple Select'
        size='small'
      >
        <MenuItem
          value='all'
          //   classes={{
          //     root: isAllSelected ? classes.selectedAll : '',
          //   }}
        >
          <ListItemIcon>
            <Checkbox
              //   classes={{ indeterminate: classes.indeterminateColor }}
              checked={isAllSelected}
              indeterminate={
                selected.length > 0 && selected.length < options.length
              }
            />
          </ListItemIcon>
          <ListItemText
            // classes={{ primary: classes.selectAllText }}
            primary='Select All'
          />
        </MenuItem>
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            <ListItemIcon>
              <Checkbox checked={selected.indexOf(option) > -1} />
            </ListItemIcon>
            <ListItemText primary={option} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default SelectCheckBox;
