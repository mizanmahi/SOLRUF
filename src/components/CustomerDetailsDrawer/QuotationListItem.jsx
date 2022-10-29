import { Typography } from '@mui/material';
import { QuotationListItemWrapper } from './customerDetailsDrawer.style';
import { ActionsWrapper } from './GetAQuoteStyle';

import FileDownloadIcon from '@mui/icons-material/FileDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { axiAuth } from '../../utils/axiosInstance';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import { useState } from 'react';
import { toast } from 'react-toastify';

const QuotationListItem = ({
   title,
   index,
   quotation,
   setQuotations,
   setQuotationToBeEdited,
   setQuoteModalOpen,
   page,
   setPage,
}) => {
   // const template1Ref = useRef(null);

   const [quotationDeleteConfirm, setQuotationDeleteConfirm] = useState({
      role: 'Quotation',
      isOpen: false,
      title: 'Delete Quotation?',
      message: 'Quotation will be deleted permanently once you continue!',
      cacheRole: 'User',
   });

   const handlePrint = () => {
      setQuotationToBeEdited(quotation);
      setQuoteModalOpen(true);
      setPage(2);
   };

   const handleEdit = () => {
      setQuotationToBeEdited(quotation);
      setQuoteModalOpen(true);
   };

   const handleDelete = async () => {
      try {
         await axiAuth.delete(`api/quotations/${quotation.id}`);
         setQuotations((prev) => prev.filter((q) => q.id !== quotation.id));
         setQuotationDeleteConfirm({
            ...quotationDeleteConfirm,
            isOpen: false,
         });
         toast.warning('Quotation deleted successfully!');
      } catch (error) {
         toast.warning(error.response.data.message);
         console.log(error);
      }
   };

   return (
      <>
         <QuotationListItemWrapper index={index}>
            <Typography variant='p' style={{ fontWeight: '600' }}>
               {title}
            </Typography>
            <ActionsWrapper>
               <FileDownloadIcon
                  style={{ color: '#000', cursor: 'pointer' }}
                  onClick={handlePrint}
               />
               <EditIcon
                  style={{ color: '#474242', cursor: 'pointer' }}
                  onClick={handleEdit}
               />
               <DeleteIcon
                  sx={{ color: 'error.main', cursor: 'pointer' }}
                  onClick={() => {
                     setQuotationDeleteConfirm({
                        ...quotationDeleteConfirm,
                        isOpen: true,
                     });
                  }}
               />
            </ActionsWrapper>
         </QuotationListItemWrapper>
         <ConfirmDialog
            confirmDialog={{
               ...quotationDeleteConfirm,
               onConfirm: handleDelete,
            }}
            setConfirmDialog={setQuotationDeleteConfirm}
            variant='warning'
         />
      </>
   );
};

export default QuotationListItem;
