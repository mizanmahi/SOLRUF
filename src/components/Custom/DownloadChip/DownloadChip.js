import { Chip, styled } from '@mui/material';
import React, { useState } from 'react';

const CustomDownloadChip = styled(Chip)(({ theme }) => ({
   marginRight: '8px',
   background: '#000',
   color: '#fff',
   borderRadius: '10px',
   fontSize: '1rem',
   '&:hover': {
      background: '#000',
      color: '#fff',
   },
   '& .MuiSvgIcon-root': {
      color: '#fff',
      '&:hover': {
         color: 'red',
      },
   },
}));

const DownloadChip = ({ doc }) => {
   const [deleteDocId, setDeleteDocId] = useState('');

   const [docDeleteConfirm, setDocDeleteConfirm] = useState({
      role: 'Document',
      isOpen: false,
      title: 'Delete Document?',
      message: 'Document will be deleted permanently once you continue!',
      cacheRole: 'User',
   });

   const handleDocDeleteClick = (doc_id) => {
      setDocDeleteConfirm({
         ...docDeleteConfirm,
         isOpen: true,
      });
      setDeleteDocId(doc_id);
   };

   return (
      <CustomDownloadChip
         label={doc?.document_name}
         onClick={() => console.log('Clicked')}
         onDelete={() => handleDocDeleteClick(doc.document_id)}
      />
   );
};

export default DownloadChip;
