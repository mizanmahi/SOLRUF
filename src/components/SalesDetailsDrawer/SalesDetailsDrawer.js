import RightDrawer from '../RightDrawer/RightDrawer';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import HorizontalProductCardForEnquiryDrawer from '../EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawer';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import {
   AnswerBox,
   EnquiryDetailsWrapper,
   Flex,
   ListWrapper,
   TabsWrapper,
} from './salesDetailsDrawer.style';
import SolrufTabPanel from '../SolrufTabPanel/SolrufTabPanel';
import { useEffect, useState } from 'react';
import ApartmentIcon from '@mui/icons-material/Apartment';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import { axiAuth } from '../../utils/axiosInstance';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import ProductCardForMobileDrawer from '../ProductCardForMobile/ProductCardForMobileDrawer';

const SalesDetailsDrawer = ({
   rightDrawerOpen,
   setRightDrawerOpen,
   salesDrawerData,
}) => {
   console.log({
      salesDrawerData,
   });

   const [orderTabs, setOrderTabs] = useState(0);
   const orderTabChangeHandler = (event, newValue) => {
      setOrderTabs(newValue);
   };

   const [biddingTabs, setBiddingTabs] = useState(0);
   const biddingTabChangeHandler = (event, newValue) => {
      setBiddingTabs(newValue);
   };

   const [queries, setQueries] = useState([]);

   const [enquiryDocuments, setDocuments] = useState([]);

   useEffect(() => {
      axiAuth
         .get(`api/vendor/enquiries/${salesDrawerData?.others?.enquiry_id}`)
         .then((res) => {
            setQueries(res.data.conversations);
         })
         .catch((err) => {
            // toast.warn(err.response.data.message);
         });
      axiAuth(
         `https://api-dev.solruf.com/api/vendor/enquiries/${salesDrawerData?.others?.enquiry_id}/documents`
      )
         .then((res) => {
            setDocuments(res.data);
         })
         .catch((err) => {});
   }, [salesDrawerData]);

   return (
      <div>
         <RightDrawer
            drawerStyles={{ backgroundColor: '#fff' }}
            open={rightDrawerOpen}
            onClose={() => setRightDrawerOpen(false)}
            anchor='right'
         >
            <EnquiryDetailsWrapper>
               <CloseIcon onClick={() => setRightDrawerOpen(false)} />

               {/* ============ drawer content box ============ */}
               <Box>
                  <Box
                     sx={{
                        my: 2,
                        display: 'flex',
                        alignItems: 'center',
                        px: 1,
                     }}
                  >
                     <Typography
                        variant='h5'
                        sx={{ mr: 2, color: '#000', fontWeight: 500 }}
                     >
                        Order Id - # {salesDrawerData.id}
                     </Typography>

                     <Box bgcolor='#3FB500' sx={{ px: 1, borderRadius: '5px' }}>
                        <Typography variant='h6' sx={{ color: '#fff' }}>
                           Order Confirmed
                        </Typography>
                     </Box>
                  </Box>

                  {salesDrawerData?.others?.details.length === 1 && (
                     <>
                        <Box
                           sx={{
                              mb: 3,
                              display: {
                                 xs: 'none',
                                 md: 'block',
                              },
                           }}
                        >
                           <HorizontalProductCardForEnquiryDrawer
                              product={
                                 salesDrawerData?.others?.details[0]?.product
                              }
                              productImage={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.defaultImage
                              }
                              productName={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.productName
                              }
                              attributes={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.attributes
                              }
                              sx={{ borderRadius: '25px' }}
                              type='enquiry'
                              productId={salesDrawerData?.others?.details[0]?.product_id}
                           />
                        </Box>
                        <Box
                           sx={{
                              display: {
                                 xs: 'block',
                                 md: 'none',
                              },
                           }}
                        >
                           <ProductCardForMobileDrawer
                              product={
                                 salesDrawerData?.others?.details[0]?.product
                              }
                              productImage={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.defaultImage
                              }
                              productName={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.productName
                              }
                              attributes={
                                 salesDrawerData?.others?.details[0]?.product
                                    ?.attributes
                              }
                              showBook={false}
                              productId={salesDrawerData?.others?.details[0]?.product_id}
                           />
                        </Box>
                     </>
                  )}

                  {salesDrawerData?.others?.details.length > 1 && (
                     <ListWrapper>
                        {salesDrawerData?.others?.details.map((item, index) => (
                           <List
                              sx={{
                                 width: '100%',
                                 // maxWidth: 360,
                                 bgcolor: 'background.paper',

                                 backgroundColor: '#f3f3f3',
                                 borderRadius: '8px',
                                 mb: 1,
                              }}
                           >
                              <ListItem alignItems='flex-start'>
                                 <ListItemAvatar>
                                    <Avatar
                                       alt='Remy Sharp'
                                       src={item.product.defaultImage}
                                    />
                                 </ListItemAvatar>
                                 <ListItemText
                                    primary={item.product.productName}
                                    secondary={
                                       <Box
                                          sx={{
                                             display: 'flex',
                                             justifyContent: 'space-between',
                                             alignItems: 'center',
                                          }}
                                       >
                                          <Typography
                                             sx={{ display: 'inline' }}
                                             component='span'
                                             variant='body2'
                                             color='text.primary'
                                          >
                                             {item.product.productSlug}
                                          </Typography>

                                          <PrimaryButton
                                             sx={{ mt: -3 }}
                                             // onClick={() =>
                                             //    handleDetailsClick(
                                             //       purchaseDrawerData.others
                                             //          .type
                                             //    )
                                             // }
                                          >
                                             Details
                                          </PrimaryButton>
                                       </Box>
                                    }
                                 />
                              </ListItem>
                           </List>
                        ))}
                     </ListWrapper>
                  )}

                  {/*  order details */}

                  <TabsWrapper>
                     <SolrufTabPanel
                        tabs={['Enquiry Details', 'Customer Profile']}
                        activeTab={orderTabs}
                        handleTabChange={orderTabChangeHandler}
                        sx={{
                           '& .MuiButtonBase-root': {
                              fontSize: '.9rem',
                              paddingTop: '0',
                           },
                           '& .MuiTabs-flexContainer': {
                              borderBottom: '2px solid #e6e6e6',
                           },
                        }}
                     />
                     {orderTabs === 0 && (
                        <Box sx={{}}>
                           <Flex
                              sx={{
                                 justifyContent: 'flex-start',
                                 alignItems: 'flex-start',
                                 mt: 1,
                              }}
                           >
                              <Box sx={{ mr: 2, minWidth: '50%' }}>
                                 <FeatureDetail
                                    icon={<ProductionQuantityLimitsIcon />}
                                    title='Quantity'
                                    value={salesDrawerData?.quantity}
                                 />
                                 <FeatureDetail
                                    icon={<LocationCityIcon />}
                                    title='City/District'
                                    value={salesDrawerData?.location}
                                 />
                                 <FeatureDetail
                                    icon={<LocationOnIcon />}
                                    title='Street'
                                    value={
                                       salesDrawerData?.others?.customer_details
                                          ?.street
                                    }
                                 />
                              </Box>
                              <Box>
                                 <FeatureDetail
                                    icon={<DateRangeIcon />}
                                    title='Date'
                                    value={salesDrawerData?.delivery_date}
                                 />

                                 <FeatureDetail
                                    icon={<FlagIcon />}
                                    title='Pin Code / Zip Code'
                                    value={
                                       salesDrawerData?.others?.customer_details
                                          ?.pincode
                                    }
                                 />
                              </Box>
                           </Flex>

                           {/* Download buttons  */}
                           <Flex
                              sx={{
                                 my: 2,
                                 flexWrap: 'wrap',
                                 justifyContent: 'start',
                                 rowGap: 1,
                              }}
                           >
                              {enquiryDocuments.documents?.map((doc) => (
                                 <DownloadChip
                                    sx={{ mr: 1 }}
                                    label={doc.name}
                                    onClick={() => console.log('Clicked')}
                                    component='a'
                                    href={doc.url}
                                    target='_blank'
                                 />
                              ))}
                           </Flex>

                           {/*  check boxes */}
                           {/* <Flex
                              sx={{
                                 flexDirection: 'column',
                                 '& .MuiFormControlLabel-root': {
                                    margin: 0,
                                 },
                              }}
                           >
                              <FormControlLabel
                                 sx={{
                                    '& .MuiTypography-root': {
                                       fontWeight: 'bold',
                                    },
                                 }}
                                 control={
                                    <Checkbox
                                       checked={
                                          enquiryDetailsForVendor?.accept_other_brands
                                       }
                                    />
                                 }
                                 label='Accept Products from other Brand?'
                              />
                           </Flex> */}
                        </Box>
                     )}
                     {orderTabs === 1 && (
                        <>
                           {true ? (
                              <Box>
                                 <Flex
                                    sx={{
                                       justifyContent: 'flex-start',
                                       alignItems: 'flex-start',
                                       mt: 1,
                                    }}
                                 >
                                    <Box sx={{ mr: 2, minWidth: '50%' }}>
                                       <FeatureDetail
                                          icon={<ApartmentIcon />}
                                          title='Company Name'
                                          value={
                                             salesDrawerData?.others?.billing
                                                ?.company_name
                                          }
                                       />
                                       <FeatureDetail
                                          icon={<LocationCityIcon />}
                                          title='City/District'
                                          value={`${salesDrawerData?.others?.billing?.city}, ${salesDrawerData?.others?.billing?.state}`}
                                       />
                                       <FeatureDetail
                                          icon={<LocationOnIcon />}
                                          title='Street'
                                          value={
                                             salesDrawerData?.others?.billing
                                                ?.address
                                          }
                                       />
                                    </Box>
                                    <Box>
                                       <FeatureDetail
                                          icon={<DateRangeIcon />}
                                          title='Date'
                                          value='20th Aug, 2022'
                                       />

                                       <FeatureDetail
                                          icon={<FlagIcon />}
                                          title='Pin Code / Zip Code'
                                          value={
                                             salesDrawerData?.others?.billing
                                                ?.pincode
                                          }
                                       />
                                    </Box>
                                 </Flex>
                              </Box>
                           ) : (
                              <Box
                                 sx={{
                                    minHeight: '250px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                 }}
                              >
                                 <Box
                                    sx={{
                                       background: 'red',
                                       display: 'flex',
                                       alignItems: 'center',
                                       justifyContent: 'center',
                                       padding: '1rem',
                                       borderRadius: '5px',
                                    }}
                                 >
                                    <Typography color='#fafafa' variant='h6'>
                                       Customer is yet to share his profile
                                    </Typography>
                                 </Box>
                              </Box>
                           )}
                        </>
                     )}
                  </TabsWrapper>

                  <TabsWrapper noPadding={true}>
                     <SolrufTabPanel
                        tabs={['Bidding Details', 'Customer Queries']}
                        activeTab={biddingTabs}
                        handleTabChange={biddingTabChangeHandler}
                        sx={{
                           '& .MuiButtonBase-root': {
                              fontSize: '.9rem',
                              paddingTop: '0rem',
                           },
                           '& .MuiTabs-flexContainer': {
                              borderBottom: '2px solid #e0e0e0',
                           },
                        }}
                     />
                     {biddingTabs === 0 && (
                        <Box sx={{ mt: 2 }}>
                           <Box sx={{ p: 2 }}>
                              <Flex
                                 sx={{
                                    justifyContent: 'flex-start',
                                    alignItems: 'flex-start',
                                    mt: 1,
                                 }}
                              >
                                 <Box sx={{ mr: 2, minWidth: '50%' }}>
                                    <FeatureDetail
                                       icon={<ProductionQuantityLimitsIcon />}
                                       title='Price'
                                       value={
                                          salesDrawerData?.others?.booking_price
                                       }
                                    />
                                    <FeatureDetail
                                       icon={<LocationCityIcon />}
                                       title='Advance Payment'
                                       value={
                                          salesDrawerData?.others?.details[0]
                                             ?.advance_payment
                                       }
                                    />
                                 </Box>
                                 <Box>
                                    <FeatureDetail
                                       icon={<DateRangeIcon />}
                                       title='Warranty years'
                                       value={
                                          salesDrawerData?.others
                                             ?.warranty_years
                                       }
                                    />

                                    <FeatureDetail
                                       icon={<FlagIcon />}
                                       title='Description'
                                       value={
                                          salesDrawerData?.others?.bid_details
                                             ?.description
                                       }
                                    />
                                 </Box>
                              </Flex>

                              {/* Download buttons  */}
                              <Flex
                                 sx={{
                                    my: 2,
                                    flexWrap: 'wrap',
                                    justifyContent: 'start',
                                    rowGap: 1,
                                 }}
                              >
                                 {enquiryDocuments.bid_documents?.map((doc) => (
                                    <DownloadChip
                                       sx={{ mr: 1 }}
                                       label={doc.name}
                                       onClick={() => console.log('Clicked')}
                                       component='a'
                                       href={doc.url}
                                       target='_blank'
                                    />
                                 ))}
                              </Flex>
                           </Box>
                        </Box>
                     )}

                     {/* ============ customer query section ============ */}
                     {biddingTabs === 1 && (
                        <div>
                           {queries?.length > 0 &&
                              queries?.map((query) => (
                                 <CustomAccordionForDrawer
                                    //   expanded={query?.answer ? true : false}
                                    title={query.question}
                                    titleStyle={{ fontSize: '1rem' }}
                                    sx={{
                                       boxShadow: 0,
                                       '& .MuiAccordionSummary-root': {
                                          borderBottom: '1px solid #D0D7D9',
                                       },
                                    }}
                                 >
                                    {queries.length === 0 && (
                                       <Box>No Query Found</Box>
                                    )}

                                    <AnswerBox>
                                       <Typography variant='body1'>
                                          Ans.{' '}
                                          <span style={{ color: '#000' }}>
                                             Answer
                                          </span>
                                       </Typography>
                                       <Box
                                          sx={{
                                             mt: 2,
                                             display: 'flex',
                                             justifyContent: 'flex-end',
                                          }}
                                       >
                                          <span className='mt-2'>
                                             <AccessTimeFilledIcon
                                                sx={{ mb: 0.2 }}
                                             />{' '}
                                             {query.created_at.substr(
                                                query.created_at.length - 8
                                             )}
                                          </span>
                                          <span className='mt-2 mx-4'>
                                             {query.created_at.substr(0, 10)}
                                          </span>
                                       </Box>
                                    </AnswerBox>
                                 </CustomAccordionForDrawer>
                              ))}
                        </div>
                     )}
                  </TabsWrapper>
               </Box>
            </EnquiryDetailsWrapper>
         </RightDrawer>
      </div>
   );
};

export default SalesDetailsDrawer;
