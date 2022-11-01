import {
   Checkbox,
   FormControlLabel,
   Typography,
   useMediaQuery,
} from '@mui/material';
import { Box, styled } from '@mui/system';
import React, { useEffect } from 'react';
import RightDrawer from '../RightDrawer/RightDrawer';
import CloseIcon from '@mui/icons-material/Close';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import { toast } from 'react-toastify';
import PaymentIcon from '@mui/icons-material/Payment';

import ApartmentIcon from '@mui/icons-material/Apartment';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import DateRangeIcon from '@mui/icons-material/DateRange';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FlagIcon from '@mui/icons-material/Flag';
import CustomAccordionForDrawer from '../Custom/CustomAccordionForDrawer/CustomAccordionForDrawer';
import YellowButton from '../YellowButton/YellowButton';

import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import SolrufTextField from '../TextField/TextField';

import { useState } from 'react';

import BackToButton from '../BackToButton/BackToButton';
import SolrufTabPanel from '../SolrufTabPanel/SolrufTabPanel';
import HorizontalProductCardForEnquiryDrawer from '../EnquiryDetailsForUser/HorizontalProductCardForEnquiryDrawer';
import { useForm } from 'react-hook-form';
import { formatDocumentUrl0 } from '../../utils/utils';
import { axiAuth } from '../../utils/axiosInstance';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import { useDispatch, useSelector } from 'react-redux';
import { setVendorEnquiriesData } from '../../redux/slices/tableSlice';
import CustomerQueries from './CustomerQueries';
import { modalTopBackButtonStyle } from '../../theme/modalTopBackButtonStyle';
import { KeyboardBackspace } from '@mui/icons-material';
import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';
import SolrufModal from '../Custom/SolrufModal/SolrufModal';
import UploadDocumentsWithName from '../Custom/UploadDocumentsWithName/UploadDocumentsWithName';
import uploadSvg from '../CustomerDetailsDrawer/uploadDocument.svg';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';
import ProductCardForMobileDrawer from '../ProductCardForMobile/ProductCardForMobileDrawer';
const EnquiryDetailsWrapper = styled(Box)(({ theme }) => ({
   position: 'relative',
   // background: '#f3f3f3',
   width: '100%',
   '& > svg': {
      position: 'absolute',
      top: '0',
      right: '0',
      fontWeight: 'bold',
      cursor: 'pointer',
   },
}));

const DrawerContent = styled(Box)(({ theme }) => ({
   // padding: '1rem',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const TabsWrapper = styled(Box)(({ theme, noPadding }) => ({
   padding: noPadding ? 0 : theme.spacing(2),
   paddingTop: theme.spacing(1),
   background: '#fff',
   borderRadius: '8px',
   margin: '1rem 0',
   boxShadow: '4px 4px 10px 0px rgba(0,0,0,0.1)',
}));

const FormWrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',
}));

const EnquiryDetailsForVendor = ({
   rightDrawerOpen,
   setRightDrawerOpen,
   drawerData: { enquiryDetailsForVendor },
   setDrawerData,
}) => {
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   const dispatch = useDispatch();
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const { vendorEnquiries } = useSelector((state) => state.tableData);

   const [documents1, setDocuments1] = useState([]);
   const [documentModalOpen, setDocumentModalOpen] = useState(false);
   const [deleteDocId, setDeleteDocId] = useState(null);

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

   const handleDocumentUpload = (e) => {
      const documents = formatDocumentUrl0(documents1);

      axiAuth
         .put(
            `api/vendor/enquiries/${enquiryDetailsForVendor.enquiry_id}/documents`,
            { documents }
         )
         .then((res) => {
            setDocumentModalOpen(false);
            setDocuments1([]);
            setPrevDocs([...res.data.documents]);
            // dispatch(setEnquiryDetails({ ...enquiryDetails, "others": { ...enquiryDetails.others, documents: res.data.documents } }))
         })
         .catch((err) => {
            console.log(err.massage);
            toast.error(err.response.data.message);
         });
   };

   const handleDocumentRemove = () => {
      const filteredArray = prevDocs.filter((doc) => doc.id !== deleteDocId);
      axiAuth
         .delete(`api/vendor/bid-documents/${deleteDocId}`)
         .then((res) => {
            setPrevDocs(filteredArray);
            setDocDeleteConfirm({
               ...docDeleteConfirm,
               isOpen: false,
            });
         })
         .catch((err) => {
            console.log(err);
         });
   };

   console.log({ enquiryDetailsForVendor });

   const [orderTabs, setOrderTabs] = useState(0);
   const orderTabChangeHandler = (event, newValue) => {
      setOrderTabs(newValue);
   };

   const [biddingTabs, setBiddingTabs] = useState(0);
   const biddingTabChangeHandler = (event, newValue) => {
      setBiddingTabs(newValue);
   };

   // const [answerImages, setAnswerImages] = useState([]);

   const [bidInfo, setBidInfo] = useState(null);
   console.log({ bidInfo });

   const [prevDocs, setPrevDocs] = useState(
      enquiryDetailsForVendor?.bid_documents || []
   );

   const bidSubmitHandler = async (data) => {
      const bidData = {
         ...data,
      };

      try {
         const { status } = await axiAuth.put(
            `api/vendor/enquiries/${enquiryDetailsForVendor.enquiry_id}/bid`,
            bidData
         );
         if (status === 200) {
            setBidInfo(bidData);
            setDrawerData((drawerData) => {
               return {
                  ...drawerData,
                  enquiryDetailsForVendor: {
                     ...drawerData.enquiryDetailsForVendor,
                     bid: bidData,
                  },
               };
            });

            const updateOnRedux = vendorEnquiries.map((enquiry) => {
               if (enquiry.enquiry_id === enquiryDetailsForVendor.enquiry_id) {
                  return {
                     ...enquiry,
                     bid: bidData,
                  };
               }
               return enquiry;
            });

            dispatch(setVendorEnquiriesData(updateOnRedux));

            reset();
            editHandler();
         }
      } catch (error) {
         console.log(error);
      }
   };

   const [isEdit, setIsEdit] = useState(false);

   useEffect(() => {
      if (enquiryDetailsForVendor.bid) {
         setBidInfo(enquiryDetailsForVendor.bid);
         setIsEdit(false);
      } else {
         setIsEdit(true);
      }
   }, [enquiryDetailsForVendor.enquiry_id, enquiryDetailsForVendor.bid]);

   console.log(isEdit);
   console.log(enquiryDetailsForVendor.bid);

   const editHandler = () => {
      console.log(enquiryDetailsForVendor);
      if (isEdit) {
         setIsEdit(false);
      } else {
         setIsEdit(true);
      }
   };

   const [customerQueries, setCustomerQueries] = useState([]);

   useEffect(() => {
      console.log('calling the api for queries');
      const fetchQueries = async () => {
         if (!enquiryDetailsForVendor?.enquiry_id) return;
         try {
            const { status, data } = await axiAuth.get(
               `api/vendor/enquiries/${enquiryDetailsForVendor.enquiry_id}`
            );
            if (status === 200) {
               setCustomerQueries(
                  data.conversations.map((conversation) => ({
                     ...conversation,
                     isEdit: false,
                  }))
               );
               console.log(data);
            }
         } catch (error) {
            setCustomerQueries([]);
            console.log(error.message);
         }
      };
      fetchQueries();
   }, [enquiryDetailsForVendor, enquiryDetailsForVendor.enquiry_id]);

   const enquiryCancelHandler = async () => {
      try {
         const { status, data } = await axiAuth.delete(
            `api/vendor/enquiries/${enquiryDetailsForVendor.enquiry_id}/cancel`
         );
         if (status === 200) {
            console.log(data);

            const updateOnRedux = vendorEnquiries.filter((enquiry) => {
               return enquiry.enquiry_id !== enquiryDetailsForVendor.enquiry_id;
            });

            dispatch(setVendorEnquiriesData(updateOnRedux));
            toast.success('Enquiry Cancelled Successfully');
            setRightDrawerOpen(false);
         }
      } catch (error) {
         console.log(error.message);
      }
   };

   console.log(errors);
   console.log(bidInfo);

   return (
      <div>
         <RightDrawer
            drawerStyles={{ backgroundColor: '#fff' }}
            open={rightDrawerOpen}
            onClose={() => setRightDrawerOpen(false)}
            anchor={`${window.innerWidth < 600 ? 'bottom' : 'right'}`}
         >
            <EnquiryDetailsWrapper>
               <Box
                  sx={modalTopBackButtonStyle}
                  onClick={() => setRightDrawerOpen(false)}
               >
                  <KeyboardBackspace />
                  <Box>Back</Box>
               </Box>
               <CloseIcon onClick={() => setRightDrawerOpen(false)} />
               <DrawerContent>
                  <Box
                     sx={{ m: 2, mt: 2, display: 'flex', alignItems: 'center' }}
                  >
                     <Typography
                        variant='h5'
                        sx={{ mr: 2, color: '#000', fontWeight: 500 }}
                     >
                        Enquiry Id - # {enquiryDetailsForVendor?.enquiry_id}
                     </Typography>

                     <Box bgcolor='#0097D3' sx={{ px: 1, borderRadius: '5px' }}>
                        <Typography variant='h6' sx={{ color: '#fff' }}>
                           Enquiry generated{' '}
                        </Typography>
                     </Box>
                  </Box>
                  <Box>
                     {matchSm ? (
                        <ProductCardForMobileDrawer
                           product={enquiryDetailsForVendor?.product?.other}
                           productImage={
                              enquiryDetailsForVendor?.product?.other
                                 .defaultImage
                           }
                           productName={
                              enquiryDetailsForVendor?.product?.other
                                 .productName
                           }
                           attributes={
                              enquiryDetailsForVendor?.product?.other.attributes
                           }
                           showBook={false}
                           productId={enquiryDetailsForVendor?.product?.other.productId}
                        />
                     ) : (
                        <HorizontalProductCardForEnquiryDrawer
                           product={enquiryDetailsForVendor?.product?.other} 
                           productImage={
                              enquiryDetailsForVendor?.product?.other
                                 .defaultImage
                           }
                           productName={
                              enquiryDetailsForVendor?.product?.other
                                 .productName
                           }
                           attributes={
                              enquiryDetailsForVendor?.product?.other.attributes
                           }
                           productId={enquiryDetailsForVendor?.product?.other.productId}
                           sx={{ borderRadius: '25px' }}
                           type='enquiry'
                        />
                     )}
                  </Box>

                  

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
                                    value={enquiryDetailsForVendor?.quantity}
                                 />
                                 <FeatureDetail
                                    icon={<LocationCityIcon />}
                                    title='City/District'
                                    value={enquiryDetailsForVendor?.location}
                                 />
                                 <FeatureDetail
                                    icon={<LocationOnIcon />}
                                    title='Street'
                                    value={
                                       enquiryDetailsForVendor?.user_address
                                          ?.address
                                    }
                                 />
                              </Box>
                              <Box>
                                 <FeatureDetail
                                    icon={<DateRangeIcon />}
                                    title='Date'
                                    value={
                                       enquiryDetailsForVendor?.delivery_date
                                    }
                                 />

                                 <FeatureDetail
                                    icon={<FlagIcon />}
                                    title='Pin Code / Zip Code'
                                    value={
                                       enquiryDetailsForVendor?.user_address
                                          ?.pin_code
                                    }
                                 />
                              </Box>
                           </Flex>

                           {/* Download buttons  */}
                           <Flex sx={{ my: 2, flexWrap: 'wrap' }}>
                              {enquiryDetailsForVendor?.documents?.map(
                                 (document) => (
                                    <DownloadChip
                                       sx={{ mr: 0.5, mb: 1 }}
                                       onClick={() => console.log('Clicked')}
                                       component='a'
                                       href={document.url}
                                       target='_blank'
                                       label={document.name}
                                    />
                                 )
                              )}
                           </Flex>

                           {/*  check boxes */}
                           <Flex
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
                           </Flex>
                        </Box>
                     )}
                     {orderTabs === 1 && (
                        <>
                           {enquiryDetailsForVendor?.share_company_information ? (
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
                                             enquiryDetailsForVendor?.company
                                                ?.name
                                          }
                                       />
                                       <FeatureDetail
                                          icon={<LocationCityIcon />}
                                          title='City/District'
                                          value={
                                             enquiryDetailsForVendor?.company
                                                ?.city +
                                             ', ' +
                                             enquiryDetailsForVendor?.company
                                                ?.state
                                          }
                                       />

                                       <FeatureDetail
                                          icon={<FlagIcon />}
                                          title='GST'
                                          value={
                                             enquiryDetailsForVendor?.company
                                                ?.gstin
                                          }
                                       />
                                    </Box>
                                    <Box>
                                       <FeatureDetail
                                          icon={<DateRangeIcon />}
                                          title='Date'
                                          value={
                                             enquiryDetailsForVendor?.created_at
                                          }
                                       />

                                       <FeatureDetail
                                          icon={<FlagIcon />}
                                          title='Pin Code / Zip Code'
                                          value={
                                             enquiryDetailsForVendor?.company
                                                ?.pin_code
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
                        <Box
                           sx={{ mt: 2 }}
                           component='form'
                           onSubmit={handleSubmit(bidSubmitHandler)}
                        >
                           {!isEdit && (
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
                                          icon={
                                             <ProductionQuantityLimitsIcon />
                                          }
                                          title='Price Per Unit'
                                          value={bidInfo?.price + ' ₹'}
                                       />
                                       <FeatureDetail
                                          icon={<PaymentIcon />}
                                          title='Advance Payment'
                                          value={
                                             bidInfo?.advance_payment + ' %'
                                          }
                                       />

                                       <FeatureDetail
                                          icon={<LocalOfferIcon />}
                                          title='Total amount'
                                          value={
                                             bidInfo?.price *
                                                enquiryDetailsForVendor?.quantity +
                                             ' ₹'
                                          }
                                       />
                                    </Box>
                                    <Box>
                                       <FeatureDetail
                                          icon={<DateRangeIcon />}
                                          title='Warranty years'
                                          value={
                                             bidInfo?.warranty_years + ' years'
                                          }
                                       />

                                       <FeatureDetail
                                          icon={<FlagIcon />}
                                          title='Description'
                                          value={bidInfo?.description}
                                       />

                                       <FeatureDetail
                                          icon={<FlagIcon />}
                                          title='Booking Price'
                                          value={
                                             (bidInfo?.price *
                                                enquiryDetailsForVendor?.quantity *
                                                bidInfo?.advance_payment) /
                                                100 +
                                             ' ₹'
                                          }
                                       />
                                    </Box>
                                 </Flex>
                              </Box>
                           )}

                           {/* ============================== edit form ============================== */}
                           {isEdit && (
                              <FormWrapper sx={{ pt: 0 }}>
                                 <BackToButton sx={{}} onClick={editHandler}>
                                    Back
                                 </BackToButton>

                                 <SolrufTextField
                                    size='small'
                                    label='Price Per Unit'
                                    defaultValue={
                                       enquiryDetailsForVendor?.bid?.price
                                    }
                                    iconText='₹'
                                    {...register('price', {
                                       required: {
                                          value: true,
                                          message: 'Please input Price',
                                       },
                                    })}
                                    error={errors.price}
                                    helperText={
                                       errors.price && errors.price.message
                                    }
                                 />
                                 <SolrufTextField
                                    defaultValue={
                                       enquiryDetailsForVendor?.bid
                                          ?.advance_payment
                                    }
                                    size='small'
                                    label='Advance payment'
                                    iconText='%'
                                    sx={{ my: 2 }}
                                    {...register('advance_payment', {
                                       required: {
                                          value: true,
                                          message:
                                             'Advance payment is required',
                                       },
                                    })}
                                    error={errors.advance_payment}
                                    helperText={
                                       errors.advance_payment &&
                                       errors.advance_payment.message
                                    }
                                 />

                                 <SolrufTextField
                                    size='small'
                                    defaultValue={
                                       enquiryDetailsForVendor?.bid
                                          ?.warranty_years
                                    }
                                    iconText='Years'
                                    label='Warranty years'
                                    {...register('warranty_years', {
                                       required: {
                                          value: true,
                                          message: 'Warranty years is required',
                                       },
                                    })}
                                    error={errors.warranty_years}
                                    helperText={
                                       errors.warranty_years &&
                                       errors.warranty_years.message
                                    }
                                 />
                                 <SolrufTextField
                                    size='small'
                                    label='Description'
                                    defaultValue={
                                       enquiryDetailsForVendor?.bid?.description
                                    }
                                    sx={{ my: 2 }}
                                    {...register('description', {
                                       required: {
                                          value: true,
                                          message: 'Description is required',
                                       },
                                    })}
                                    error={errors.description}
                                    helperText={
                                       errors.description &&
                                       errors.description.message
                                    }
                                 />
                              </FormWrapper>
                           )}

                           {/* ============================== edit form end ============================== */}

                           {isEdit ? (
                              <YellowButton
                                 style={{
                                    width: '100%',
                                    background: isEdit ? '#ffd05b' : '#D0D7D9',
                                    borderRadius: '0 0 10px 10px',
                                 }}
                                 onClick={() => {
                                    if (!isEdit) {
                                       editHandler();
                                    }
                                 }}
                                 type='submit'
                              >
                                 Save
                              </YellowButton>
                           ) : (
                              <PrimaryButton
                                 style={{
                                    width: '100%',
                                    background: isEdit ? '#ffd05b' : '#D0D7D9',
                                    borderRadius: '0 0 10px 10px',
                                 }}
                                 onClick={editHandler}
                              >
                                 Edit
                              </PrimaryButton>
                           )}
                        </Box>
                     )}

                     {/* ============ customer query section ============ */}
                     {biddingTabs === 1 && (
                        <Box sx={{ p: 2 }}>
                           <CustomerQueries
                              queries={customerQueries}
                              setCustomerQueries={setCustomerQueries}
                              enquiry_id={enquiryDetailsForVendor.enquiry_id}
                           />
                        </Box>
                     )}
                  </TabsWrapper>

                  <Box sx={{ my: 4 }}>
                     <CustomAccordionForDrawer
                        expanded={true}
                        title='Bid Documents'
                        titleStyle={{ fontSize: '1rem' }}
                        sx={{
                           my: 2,
                           boxShadow: '4px 4px 10px 0px rgba(0,0,0,0.1)',
                           '& .MuiAccordionSummary-root': {
                              borderBottom: '1px solid #D0D7D9',
                           },
                        }}
                     >
                        <Box sx={{ mt: 1.5 }}>
                           <img
                              src={uploadSvg}
                              alt=' upload svg'
                              onClick={() => setDocumentModalOpen(true)}
                              style={{ cursor: 'pointer' }}
                           />
                        </Box>

                        <Flex sx={{ mt: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
                           {prevDocs?.length > 0 &&
                              prevDocs?.map((doc) => (
                                 <>
                                    <DownloadChip
                                       label={doc?.name}
                                       onClick={() => {
                                          window.open(doc.url, '_blank');
                                       }}
                                       onDelete={(e) =>
                                          handleDocDeleteClick(doc.id)
                                       }
                                    />
                                 </>
                              ))}
                        </Flex>

                        {/* =========  document upload modal ========= */}
                        <SolrufModal
                           open={documentModalOpen}
                           onClose={() => setDocumentModalOpen(false)}
                        >
                           <UploadDocumentsWithName
                              documents={documents1}
                              setDocuments={setDocuments1}
                           />
                           <PrimaryButton
                              fullWidth
                              onClick={handleDocumentUpload}
                           >
                              Done
                           </PrimaryButton>
                        </SolrufModal>
                     </CustomAccordionForDrawer>
                  </Box>

                  <PrimaryButton
                     fullWidth
                     variant='secondary'
                     sx={{
                        borderColor: '#F20519',
                        color: '#F20519',
                        '&:hover': {
                           background: '#F20519',
                           color: '#fff',
                        },
                     }}
                     onClick={enquiryCancelHandler}
                  >
                     Cancel Enquiry
                  </PrimaryButton>
                  <ConfirmDialog
                     confirmDialog={{
                        ...docDeleteConfirm,
                        onConfirm: handleDocumentRemove,
                     }}
                     setConfirmDialog={setDocDeleteConfirm}
                     variant='warning'
                  />
               </DrawerContent>
            </EnquiryDetailsWrapper>
         </RightDrawer>
      </div>
   );
};

export default EnquiryDetailsForVendor;
