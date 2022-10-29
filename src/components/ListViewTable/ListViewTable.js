import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const ListViewTable = ({
   provided,
   list,
   onClickEdit,
   onClickDelete,
   unit,
}) => {
   let lists = (array) => {
      let text = '';
      array?.forEach((element, index) => {
         text += element;
         if (index !== array.length - 1) {
            text += ', ';
         }
      });
      return text;
   };

   const [deleteProductField, setDeleteProductField] = useState({
      role: 'Delete Product Field',
      isOpen: false,
      title: 'Delete this Product Field?',
      message: 'Deleted Product Field cannot be recovered.',
      cacheRole: 'Admin Product',
   });

   return (
      <Box
         className='upload-background'
         sx={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            mt: '1rem',
         }}
      >
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
               {list.attribute_name ? list.attribute_name : list.value}
            </Typography>
         </div>
         <Box>
            <Typography
               variant='h6'
               gutterBottom
               style={{
                  fontSize: '1rem',
                  fontWeight: 500,
               }}
               sx={{ textAlign: 'center' }}
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
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
               columnGap: '1rem',
            }}
         >
            <EditIcon
               sx={{
                  cursor: 'pointer',
               }}
               onClick={onClickEdit}
            />
            <DeleteIcon
               sx={{
                  cursor: 'pointer',
                  '&:hover': {
                     color: 'red',
                  },
               }}
               onClick={() => {
                  setDeleteProductField({
                     ...deleteProductField,
                     isOpen: true,
                  });
               }}
            />
         </Box>
         <ConfirmDialog
            confirmDialog={{
               ...deleteProductField,
               onConfirm: () =>
                  onClickDelete(() => {
                     setDeleteProductField({
                        ...deleteProductField,
                        isOpen: false,
                     });
                  }),
            }}
            setConfirmDialog={setDeleteProductField}
            variant='warning'
         />
      </Box>
   );
};

export default ListViewTable;
