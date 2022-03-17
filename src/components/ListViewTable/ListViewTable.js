import { Box, Typography } from '@mui/material';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const ListViewTable = ({ provided, list, onClickEdit, unit }) => {
   let lists = (array) => {
      let text = '';
      array.forEach((element, index) => {
         text += element;
         if (index !== array.length - 1) {
            text += ', ';
         }
      });
      return text;
   };
   return (
      <div className='upload-background mt-4 d-flex justify-content-between w-100'>
         <div draggable='true'>
            <Typography
               variant='h6'
               gutterBottom
               style={{
                  fontSize: '1rem',
                  fontWeight: 400,
               }}
               className='my-auto'
            >
               {list.value}
            </Typography>
         </div>
         <Box >
            <Typography
               variant='h6'
               gutterBottom
               style={{
                  fontSize: '1rem',
                  fontWeight: 500,
               }}
               sx={{textAlign: 'center'}}
               className='my-auto'
            >
               {list.value_unit} {list.value_unit_type}
            </Typography>
         </Box>
         <div className='w-25'>
            <Typography
               variant='h6'
               gutterBottom
               style={{
                  fontSize: '1rem',
                  fontWeight: 400,
               }}
               className='my-auto'
            >
               {lists(list.fieldViewPoints)}
            </Typography>
         </div>
         <div>
            <EditIcon className='cursor-pointer' onClick={onClickEdit} />
         </div>
      </div>
   );
};

export default ListViewTable;
