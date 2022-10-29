import { FormControlLabel, Radio, RadioGroup, useRadioGroup } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { Fragment, useEffect, useState } from 'react';
import SortFilterAccordion from './SortFilterAccordion';

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));


interface StyledFormControlLabelProps extends FormControlLabelProps {
   checked: boolean;
 }
 
 const StyledFormControlLabel = styled((props: StyledFormControlLabelProps) => (
   <FormControlLabel {...props} />
 ))(({ theme, checked }) => ({
   '.MuiFormControlLabel-label': checked && {
     fontWeight : 'bold'
   },
 }));

function MyFormControlLabel(props: FormControlLabelProps) {
   const radioGroup = useRadioGroup();
 
   let checked = false;
 
   if (radioGroup) {
     checked = radioGroup.value === props.value;
   }
 
   return <StyledFormControlLabel checked={checked} {...props} />;
 }

const SortFilter = ({title,sx,sortFilter,setSortFilter}) => {
   
   return (
      <Fragment>
            <Box sx={{ ...sx }}>
               <SortFilterAccordion title={title} sortFilter={sortFilter}>
                  <Flex sx={{ justifyContent: 'space-between'}}>
                     <RadioGroup
                        value={sortFilter[title] ? 'ascending' : 'descending'}
                        onChange={(e) => setSortFilter({...sortFilter,[title]:e.target.value === "ascending" ? true : false})}
                        >
                        <MyFormControlLabel value="ascending" control={<Radio />} label="Ascending" />
                        <MyFormControlLabel value="descending" control={<Radio sx={{py:0}}/>} label="Descending" />
                     </RadioGroup>
                  </Flex>
               </SortFilterAccordion>
            </Box>
      </Fragment>
   );
};

export default SortFilter;
