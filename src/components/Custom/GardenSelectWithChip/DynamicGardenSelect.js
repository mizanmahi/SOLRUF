/**
 * Copyright Zendesk, Inc.
 *
 * Use of this source code is governed under the Apache License, Version 2.0
 * found at http://www.apache.org/licenses/LICENSE-2.0.
 */

import React, { useState, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import './gardenSelectWithChip.css';

import {
   Dropdown,
   Multiselect,
   Field,
   Menu,
   Item,
   Label,
} from '@zendeskgarden/react-dropdowns';
import { Tag } from '@zendeskgarden/react-tags';
import { Box } from '@mui/material';


const DynamicGardenSelect = ({ selectFilters, setSelectFilters, id, name }) => {
   const [selectedItems, setSelectedItems] = useState([]);
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState(false);

   const targetFilter = selectFilters.filter((item) => item.id === id);
   const filterOptions = targetFilter[0].items;

   const [matchingOptions, setMatchingOptions] = useState(filterOptions);

   // console.log({ filterOptions, filterName: name });

   useEffect(() => {
      setSelectFilters(
         selectFilters.map((item) => {
            if (item.id === id) {
               return {
                  ...item,
                  selectedItems: selectedItems,
               };
            } else {
               return item;
            }
         })
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedItems, id]);

   const filterMatchingOptionsRef = useRef(
      debounce((value) => {
         const matchedOptions = filterOptions.filter((option) => {
            return (
               option.value
                  ?.trim()
                  ?.toLowerCase()
                  ?.indexOf(value.trim().toLowerCase()) !== -1
            );
         });

         setMatchingOptions(matchedOptions);
         setIsLoading(false);
      }, 300)
   );

   useEffect(() => {
      setIsLoading(true);
      filterMatchingOptionsRef.current(inputValue);
   }, [inputValue]);

   const renderOptions = () => {
      if (isLoading) {
         return <Item disabled>Loading items...</Item>;
      }

      if (matchingOptions.length === 0 && filterOptions.length === 0) {
         return <Item disabled>No matches found</Item>;
      }

      if (matchingOptions.length === 0) {
         return filterOptions.map((option) => (
            <Item
               key={option.value}
               value={option.value}
               className='select-option'
            >
               <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Box>
                     <span>{option.value}</span>
                     <strong style={{ marginLeft: '2px' }}>
                        {option.value_unit}
                     </strong>
                  </Box>
                  <strong style={{ marginLeft: '15px' }}>
                     ({option.products_count})
                  </strong>
               </Box>
            </Item>
         ));
      }

      return matchingOptions.map((option) => (
         <Item
            key={option.value}
            value={option.value}
            className='select-option'
         >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
               <Box>
                  <span>{option.value}</span>
                  <strong style={{ marginLeft: '2px' }}>
                     {option.value_unit}
                  </strong>
               </Box>
               <strong style={{ marginLeft: '15px' }}>
                  ({option.products_count})
               </strong>
            </Box>
         </Item>
      ));
   };

   return (
      <Dropdown
         inputValue={inputValue}
         selectedItems={selectedItems}
         onSelect={(items) => setSelectedItems(items)}
         downshiftProps={{ defaultHighlightedIndex: 0 }}
         onInputValueChange={(value) => setInputValue(value)}
      >
         <Field className='garden-select'>
            <Label className='label'>{name}</Label>

            <Multiselect
               renderShowMore={(n) => (
                  <span className='selectCount'>+{n} More</span>
               )}
               className='select__input'
               id='select__input'
               maxItems={1}
               placeholder='Select Category'
               renderItem={({ value, removeValue }) => (
                  <Tag className='tag'>
                     <span>{value}</span>
                     <Tag.Close onClick={() => removeValue()} />
                  </Tag>
               )}
            />
         </Field>
         <Menu>{renderOptions()}</Menu>
      </Dropdown>
   );
};

export default DynamicGardenSelect;
