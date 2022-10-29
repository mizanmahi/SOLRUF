import { AccordionDetails, Button, Divider, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect, useState } from 'react';
import BackToButton from '../BackToButton/BackToButton';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import SendIcon from '@mui/icons-material/Send';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import AddIcon from '@mui/icons-material/Add';
import { axiAuth } from '../../utils/axiosInstance';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';

const Wrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',

   background: '#FFFFFF',
   borderRadius: '10px',
}));
const Nav = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   marginBottom: '2rem',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
}));

const AnswerBox = styled(Box)(({ theme }) => ({
   background: '#f3f3f3',
   padding: '1rem',
   borderRadius: '0.5rem',
}));

export const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '.6rem 0 0rem 0',
      border: '2px solid #FFD05B !important',
      background: '#F3F3F3',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
   };
});

const NoAnswerBox = styled(Box)(({ theme }) => ({
   background: '#F20519',
   padding: '1rem',
   borderRadius: '0.5rem',
   width: '80%',
   margin: '0 auto',
   '& p': {
      color: '#FFFFFF',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      textAlign: 'center',
   },
}));

const Answer = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'flex-start',
   alignItems: 'flex-start',
}));

const VendorDetails = ({
   onClose,
   vendorData,
   enquiryId,
   handleConfirmation,
   bidDocuments,
   quantity,
}) => {
   const [createQuery, setCreateQuery] = React.useState(false);

   const [queries, setQueries] = useState([]);

   console.log(vendorData);

   const handleQueryToggle = () => {
      setCreateQuery(!createQuery);
   };

   const queryCreateHandler = async (e) => {
      e.preventDefault();
      const query = {
         vendor_id: vendorData?.id,
         enquiry_id: enquiryId,
         question: e.target[0].value,
      };

      try {
         const { status, data } = await axiAuth.post(`api/queries`, query);
         if (status === 200) {
            setCreateQuery(false);
            console.log(data);
            setQueries(data.conversations);
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      const fetchQuery = async () => {
         const { status, data } = await axiAuth.get(
            `api/queries?enquiry_id=${enquiryId}&vendor_id=${vendorData?.id}`
         );
         if (status === 200) {
            setQueries(data.conversations);
            console.log(data);
         }
      };

      fetchQuery();
   }, [enquiryId, vendorData?.id]);

   const deleteQueryHandler = async (query_id, conversation_id) => {
      try {
         const { status, data } = await axiAuth.delete(
            `api/queries/${query_id}/conversations/${conversation_id}`
         );
         if (status === 200) {
            console.log(data);
            setQueries((queries) =>
               queries.filter(
                  (query) => query.conversation_id !== conversation_id
               )
            );
         }
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <Wrapper>
         <Nav>
            <BackToButton onClick={onClose}>Back To Bids</BackToButton>
            <PrimaryButton sx={{ px: 3 }} onClick={() => handleConfirmation()}>
               Confirm
            </PrimaryButton>
         </Nav>
         <Flex sx={{ mb: 1, alignItems: 'center' }}>
            <Typography variant='h5'>{vendorData?.portfolio?.name}</Typography>
            <a
               href={`https://solruf.com/portfolio/${vendorData?.portfolio?.slug}`}
               alt='go to portfolio'
               target='_blank'
               rel='noreferrer'
            >
               <RoundedDarkButton title='Check Detail Portfolio' />
            </a>
         </Flex>

         <Typography variant='h6'>Bidding Details</Typography>
         <Divider />

         <Flex
            sx={{
               justifyContent: 'flex-start',
               alignItems: 'flex-start',
               mt: 3,
            }}
         >
            <Box sx={{ mr: 2, minWidth: '50%' }}>
               <FeatureDetail
                  title='Bidding Price'
                  value={vendorData?.bid?.price + ' ₹'}
                  icon={<LocalAtmIcon />}
               />
               <FeatureDetail
                  valueStyle={{
                     maxWidth: '500px',
                  }}
                  title='Description'
                  value={vendorData?.bid?.description}
                  icon={<DescriptionIcon />}
               />
               <FeatureDetail
                  valueStyle={{
                     maxWidth: '500px',
                  }}
                  title='Total Amount'
                  value={vendorData?.bid?.price * quantity + ' ₹'}
                  icon={<DescriptionIcon />}
               />
            </Box>
            <Box>
               <FeatureDetail
                  title='Advanced Payment'
                  value={vendorData?.bid?.advance_payment + ' %'}
                  icon={<PaymentsIcon />}
               />

               <FeatureDetail
                  title='Warranty Years'
                  value={vendorData?.bid?.warranty_years + ' Years'}
                  icon={<CalendarTodayIcon />}
               />
               <FeatureDetail
                  title='Booking Price'
                  value={
                     (vendorData?.bid?.price *
                        quantity *
                        vendorData?.bid?.advance_payment) /
                        100 +
                     ' ₹'
                  }
                  icon={<CalendarTodayIcon />}
               />
            </Box>
         </Flex>

         <Flex
            sx={{ my: 3, flexWrap: 'wrap', justifyContent: 'start', rowGap: 1 }}
         >
            {bidDocuments?.map(({ name, url }, index) => (
               <DownloadChip
                  key={name}
                  label={name}
                  sx={{ mr: 1 }}
                  onClick={() => console.log('Clicked')}
                  component='a'
                  href={url}
                  target='_blank'
               />
            ))}
         </Flex>

         {/* ================== query section ================== */}
         <Typography variant='h6'>Queries</Typography>
         <Divider sx={{ mb: 3 }} />

         <PrimaryButton
            sx={{ mb: '1rem', px: 2 }}
            onClick={handleQueryToggle}
            IconStart={AddIcon}
         >
            Query
         </PrimaryButton>

         {createQuery && (
            <form onSubmit={queryCreateHandler}>
               <Textarea
                  rows='3'
                  placeholder='Write Your query..'
                  style={{
                     backgroundColor: '#f3f3f3',
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
                     sx={{ mr: 2 }}
                     onClick={() => setCreateQuery(false)}
                  >
                     Cancel
                  </PrimaryButton>
                  <PrimaryButton
                     sx={{ px: 2 }}
                     IconStart={SendIcon}
                     type='submit'
                  >
                     Post
                  </PrimaryButton>
               </Box>
            </form>
         )}

         {queries?.map((query, index) => (
            <CustomAccordionForDrawer
               title={`${index + 1}. ${query.question}`}
               // iconButton='delete'
               titleStyle={{ fontSize: '1rem' }}
               sx={{
                  margin: '16px 0 16px 16px',
                  px: 0,
                  boxShadow: 0,
                  '& .MuiAccordionSummary-root': {
                     background: '#F3F3F3',
                     borderBottom: '1px solid #D0D7D9',
                     color: 'rgba(0,0,0,0.67) !important',
                  },
                  '& .MuiAccordionDetails-root': {
                     padding: '0',
                  },
               }}
            >
               <>
                  <AccordionDetails
                     sx={{
                        color: '#4D4D4D',
                        background: '#F3F3F3',
                        padding: '0',
                        borderRadius: '0 0 10px 10px',
                     }}
                  >
                     <Box
                        sx={{
                           pt: 1,
                           px: 2,
                           display: 'flex',
                           justifyContent: 'flex-start',
                           alignItems: 'center',
                        }}
                     >
                        <Box component='span' sx={{
                           display: 'flex',
                           alignItems: 'center',
                           mr: 1,
                        }}>
                        
                           {query.created_at.substr(
                              query.created_at.length - 8
                           )}
                        </Box>
                        <span>{query.created_at.split(' ')[0]}</span>
                        <Button
                           variant='text'
                           sx={{
                              color: '#F20519',
                              textTransform: 'none',
                              fontSize: '1.1rem',
                           }}
                           onClick={() =>
                              deleteQueryHandler(
                                 query.query_id,
                                 query.conversation_id
                              )
                           }
                        >
                           Delete
                        </Button>
                     </Box>
                     {query.answer ? (
                        <AnswerBox>
                           <Answer>
                              <Typography variant='h6'>Ans:</Typography>
                              <Typography
                                 variant='h6'
                                 textAlign='left'
                                 sx={{ ml: 1, fontWeight: 300 }}
                              >
                                 {query.answer}
                              </Typography>
                           </Answer>
                        </AnswerBox>
                     ) : (
                        <Box sx={{ py: 3 }}>
                           <NoAnswerBox>
                              <Typography variant='body1'>
                                 No Answer Yet
                              </Typography>
                           </NoAnswerBox>
                        </Box>
                     )}
                  </AccordionDetails>
               </>
            </CustomAccordionForDrawer>
         ))}
      </Wrapper>
   );
};

export default VendorDetails;
