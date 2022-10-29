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



const GardenSelectWithChip = ({options, selectedItems, setSelectedItems }) => {
   const [inputValue, setInputValue] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const [matchingOptions, setMatchingOptions] = useState(options);


   console.log(selectedItems);

   const filterMatchingOptionsRef = useRef(
      debounce((value) => {
         const matchedOptions = options.filter((option) => {
            return (
               option
                  .trim()
                  .toLowerCase()
                  .indexOf(value.trim().toLowerCase()) !== -1
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

      if (matchingOptions.length === 0) {
         return <Item disabled>No matches found</Item>;
      }

      return matchingOptions.map((option) => (
         <Item key={option} value={option} className='select-option'>
            <span>{option}</span>
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
            <Label className='label'>Category</Label>
           
            <Multiselect
               renderShowMore={(n) => (
                  <span className='selectCount'>+{n} More</span>
               )}
               className='select__input'
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

export default GardenSelectWithChip;
