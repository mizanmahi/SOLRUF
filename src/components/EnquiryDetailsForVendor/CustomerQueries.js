import { Box, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { styled } from '@mui/system';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import { Textarea } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import { axiAuth } from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

const AnswerBox = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   padding: '1rem',
   borderRadius: '0.5rem',
}));

const NoAnswerBox = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   padding: '1rem',
   borderRadius: '0.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
}));

const CustomerQueries = ({ queries, setCustomerQueries, enquiry_id }) => {
   console.log(queries);

   const [deleteQueryId, setDeleteQueryId] = useState('');

   const editQueryHandler = (conversationId) => {
      console.log(conversationId);

      const updatedQueries = queries.map((query) => {
         if (query.conversation_id === conversationId) {
            return { ...query, isEdit: !query.isEdit };
         } else {
            return query;
         }
      });
      setCustomerQueries(updatedQueries);
   };

   const queryUpdateHandler = (e, conversation_id, user_id) => {
      console.log(e.target[0].value);
      console.log(conversation_id);
      e.preventDefault();

      let answer = {
         user_id,
         conversation_id,
         answer: e.target[0].value,
      };
      console.log(answer);
      axiAuth
         .put(`api/vendor/enquiries/${enquiry_id}/reply`, answer)
         .then((res) => {
            if (res.status === 200) {
               setCustomerQueries((queries) =>
                  queries.map((query) => {
                     if (query.conversation_id === conversation_id) {
                        return {
                           ...query,
                           isEdit: false,
                           answer: e.target[0].value,
                        };
                     } else {
                        return query;
                     }
                  })
               );
               toast.success('Query updated successfully');
            }
         })
         .catch((err) => {
            console.log('Error answering query', err);
         });
   };

   const handleDeleteQueryClick = (conversation_id) => {
      console.log(conversation_id);
      setDeleteQueryId(conversation_id);

      setQueryDeleteConfirm({
         ...queryDeleteConfirm,
         isOpen: true,
      });
   };

   const queryDeleteHandler = () => {
      const { conversation_id, owner_id: user_id } = queries.find(
         (query) => query.conversation_id === deleteQueryId
      );

      let answer = {
         user_id,
         conversation_id,
         answer: null,
      };

      console.log(answer);

      axiAuth
         .put(`api/vendor/enquiries/${enquiry_id}/reply`, answer)
         .then((res) => {
            if (res.status === 200) {
               setCustomerQueries((queries) =>
                  queries.map((query) => {
                     if (query.conversation_id === conversation_id) {
                        return {
                           ...query,
                           isEdit: false,
                           answer: null,
                        };
                     } else {
                        return query;
                     }
                  })
               );
               setQueryDeleteConfirm({
                  ...queryDeleteConfirm,
                  isOpen: false,
               });
               toast.warn('Query Deleted successfully !');
            }
         })
         .catch((err) => {
            console.log('Error deleting query', err);
         });
   };

   const [queryDeleteConfirm, setQueryDeleteConfirm] = useState({
      role: 'Answer',
      isOpen: false,
      title: 'Delete Answer?',
      message: 'Answer will be deleted permanently once you continue!',
      cacheRole: 'Vendor',
   });

   return (
      <Box>
         {queries.map((query, index) =>
            query.isEdit ? (
               <Box>
                  <Typography sx={{ mt: 1, fontWeight: 600, px: 1 }}>
                     <span style={{
                        color: '#000'
                     }}>Answer : Query No.{index + 1}</span> {query.question}
                  </Typography>
                  <form
                     onSubmit={(e) =>
                        queryUpdateHandler(
                           e,
                           query?.conversation_id,
                           query?.owner_id
                        )
                     }
                  >
                     <Textarea
                        rows='3'
                        defaultValue={query?.answer}
                        placeholder='Add Your answer..'
                        sx={{
                           background: 'white',
                        }}
                     ></Textarea>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'right',
                           my: 1,
                        }}
                     >
                        <PrimaryButton
                           variant='secondary'
                           onClick={() =>
                              editQueryHandler(query?.conversation_id)
                           }
                           sx={{
                              mr: 2,
                              color: 'black',
                           }}
                        >
                           Cancel
                        </PrimaryButton>
                        <PrimaryButton
                           sx={{ px: 2.5 }}
                           variant='contained'
                           type='submit'
                        >
                           Submit
                        </PrimaryButton>
                     </Box>
                  </form>
               </Box>
            ) : (
               <CustomAccordionForDrawer
                  //   expanded={query?.answer ? true : false}
                  title={`${index + 1}. ${query.question}`}
                  titleStyle={{ fontSize: '1rem' }}
                  sx={{
                     boxShadow: 0,
                     '& .MuiAccordionSummary-root': {
                        borderBottom: '1px solid #D0D7D9',
                     },
                  }}
               >
                  {query.answer ? (
                     <AnswerBox>
                        <Typography variant='body1'>
                           Ans.{' '}
                           <span style={{ color: '#000' }}>{query.answer}</span>
                        </Typography>

                        <Box
                           sx={{
                              mt: 2,
                              display: 'flex',
                              justifyContent: 'flex-end',
                           }}
                        >
                           <span className='mt-2'>
                              <AccessTimeFilledIcon sx={{ mb: 0.2 }} />{' '}
                              {query.created_at.substr(
                                 query.created_at.length - 8
                              )}
                           </span>
                           <span className='mt-2 mx-4'>
                              {query.created_at.substr(0, 10)}
                           </span>
                           <Button
                              variant='text'
                              sx={{
                                 color: '#666F73',
                                 textTransform: 'none',
                              }}
                              onClick={() =>
                                 editQueryHandler(query.conversation_id)
                              }
                           >
                              Edit
                           </Button>
                           <Button
                              // onClick={leadsEditHandler}
                              variant='text'
                              sx={{
                                 color: '#F20519',
                                 textTransform: 'none',
                              }}
                              onClick={(e) =>
                                 handleDeleteQueryClick(query?.conversation_id)
                              }
                           >
                              Delete
                           </Button>
                        </Box>
                     </AnswerBox>
                  ) : (
                     <NoAnswerBox>
                        <PrimaryButton
                           sx={{ px: 2 }}
                           onClick={() =>
                              editQueryHandler(query.conversation_id)
                           }
                        >
                           Answer this query
                        </PrimaryButton>
                     </NoAnswerBox>
                  )}
               </CustomAccordionForDrawer>
            )
         )}

         <ConfirmDialog
            confirmDialog={{
               ...queryDeleteConfirm,
               onConfirm: queryDeleteHandler,
            }}
            setConfirmDialog={setQueryDeleteConfirm}
            variant='warning'
         />
      </Box>
   );
};

export default CustomerQueries;
