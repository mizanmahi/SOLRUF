import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardContent, Checkbox, Stack, Typography } from '@mui/material';
import './GlobalTable.css';

import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import EventIcon from '@mui/icons-material/Event';
import ProductName from '../../media/Svg/ProductName.svg';
import Status from '../../media/Svg/Status.svg';
import BusinessDetail from '../../media/Svg/BusinessDetail.svg';
import { Box } from '@mui/system';
import LeadStatus from '../../pages/LeadStatus/LeadStatus';
import CustomBottomBar from '../CustomBottomBar/CustomBottomBar';
import { useLocation } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';

import CustomerDetailsDrawer from '../CustomerDetailsDrawer/CustomerDetailsDrawer';
import SolrufModal from '../Custom/SolrufModal/SolrufModal';
import ReminderModalContent from '../ReminderModalContent/ReminderModalContent';
import EnquiryDetailsForVendor from '../EnquiryDetailsForVendor/EnquiryDetailsForVendor';
import { setEnquiryDetails } from '../../redux/slices/userSlice';
import EnquiryDetailsForUser from '../EnquiryDetailsForUser/EnquiryDetailsForUser';
import DraggableBottomDialog from '../Custom/BottomDialog/DraggableBottomDialog';
import PurchaseDetailsDrawer from '../PurchaseDetailsDrawer/PurchaseDetailsDrawer';
import SalesDetailsDrawer from '../SalesDetailsDrawer/SalesDetailsDrawer';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';

// ============================================ Mobile View =============================================
function GlobalMobileTable({ columns, data, searchTerm, filters }) {
   const dispatch = useDispatch();
   const [mobileData, setMobileData] = useState(data);
   const [selectedRowIds, setSelectedRowIds] = useState([]);
   const location = useLocation();
   const locationNeed = location.pathname === '/vendor/dashboard/customerLeads';
   const [filterDialogOpen, setFilterDialogOpen] = useState(false);
   const [sortDialogOpen, setSortDialogOpen] = useState(false);
   // const [priceRange, setPriceRange] = useState({
   //    from: 0,
   //    to: 0,
   // });
   // const [invalidRange, setInvalidRange] = useState(false);
   const [reminderModalOpen, setReminderModalOpen] = useState(false);
   //  const [customerDetailDialog, setCustomerDetailDialog] = useState(false);
   const [userEnquiryDetailDrawer, setUserEnquiryDetailDrawer] =
      useState(false);
   const [vendorEnquiryDetailDrawer, setVendorEnquiryDetailDrawer] =
      useState(false);

   const [customerDetailDrawer, setCustomerDetailDrawer] = useState(false);

   const [purchaseDetailsDrawer, setPurchaseDetailsDrawer] = useState(false);
   const [salesDetailsDrawer, setSalesDetailsDrawer] = useState(false);
   const [purchaseDrawerData, setPurchaseDrawerData] = useState({});
   const [salesDrawerData, setSalesDrawerData] = useState({});

   const [rowData, setRowData] = useState({});
   const [drawerData, setDrawerData] = useState({
      customerId: {},
      enquiryDetailsForUser: {},
      enquiryDetailsForVendor: {},
   });

   // const onSearchChange = (e) => {
   //    let val = e.target.value;
   //    console.log(val);
   //    const filterData = data.filter((ele) => {
   //       return (
   //          ele.firstName?.includes(val) ||
   //          ele.lastName?.includes(val) ||
   //          ele.status?.includes(val)
   //       );
   //    });
   //    setMobileData(filterData);
   //    setSearchval(val);
   // };

   useEffect(() => {
      setMobileData(data);
   }, [data]);

   // const deleteUserHandler = (event) => {
   //    if (selectedRowIds?.length !== 0) {
   //       const customer_ids = [];

   //       for (let i = 0; i < selectedRowIds.length; i++) {
   //          // const element = selectedRowIds[i];
   //          customer_ids.push(data[i].customer_id);
   //       }

   //       axiAuth
   //          .post(`api/vendor/customers/mass-delete`, { customer_ids })
   //          .then((res) => {
   //             const newData = data.filter(
   //                (el) => !customer_ids.includes(el.customer_id)
   //             );
   //             setMobileData([...newData]);
   //             setSelectedRowIds([]);
   //             toast.success('Items successfully deleted!!');
   //          })
   //          .catch((err) => {
   //             console.log(err);
   //          });
   //    }
   // };

   const checkBoxClick = (id) => {
      if (selectedRowIds.includes(id)) {
         const filData = selectedRowIds.filter((item) => {
            return item !== id;
         });
         setSelectedRowIds(filData);
      } else {
         setSelectedRowIds([...selectedRowIds, id]);
      }
   };

   // const sortResetHandler = () => {
   //    Object.entries(sortCategories).map((item) => {
   //       setFilterSort({ ...sortCategories, [item]: false });
   //    });
   // };

   const { remindersTabOpen, purchaseTabOpen, salesTabOpen } = useSelector(
      (state) => state.tableData
   );

   const handleRowClick = (row) => {
      if (location.pathname === '/vendor/dashboard/customerLeads') {
         setCustomerDetailDrawer(true);
         setDrawerData({
            ...drawerData,
            customerId: row.customer_id
               ? row.customer_id
               : row.customer.customer_id,
         });
      } else if (location.pathname === '/vendor/dashboard/sale') {
         if (salesTabOpen) {
            setSalesDrawerData(row);
            setSalesDetailsDrawer(true);
         } else {
            setVendorEnquiryDetailDrawer(true);
            console.log(row);
            setDrawerData({
               ...drawerData,
               enquiryDetailsForVendor: row,
            });
         }
      } else if (location.pathname === '/user-dashboard/purchase-enquiries') {
         dispatch(setEnquiryDetails(data.find((item) => item.id === row.id)));
         setUserEnquiryDetailDrawer(true);
      } else if (location.pathname === '/vendor/dashboard/purchase') {
         if (purchaseTabOpen) {
            console.log({ row });

            setPurchaseDrawerData(row);
            setPurchaseDetailsDrawer(true);
         } else {
            dispatch(
               setEnquiryDetails(data.find((item) => item.id === row.id))
            );
            setUserEnquiryDetailDrawer(true);
         }
      } else if (location.pathname === '/vendor/dashboard/consultation') {
         if (remindersTabOpen) {
            // if the reminder tab is true then don't open the drawer instead show a modal
            setRowData(row);
            setReminderModalOpen(true);
         }
      }
   };

   return (
      <div id='mobile_table__content'>
         {/* Filter :- reset and apply */}
         <DraggableBottomDialog
            open={filterDialogOpen}
            handleClose={() => setFilterDialogOpen(false)}
            // height="70%"
            bar={true}
            text={'Filters'}
         >
            <Box sx={{ py: 2, px: 1, minHeight: '500px' }}>
               <Stack direction='column' spacing={2}></Stack>
            </Box>
            <CustomBottomBar>
               <PrimaryButton
                  style={{
                     border: '2px solid #F20519',
                     color: '#F20519',
                     background: '#fff',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: '0',
                  }}
                  IconStart={CloseIcon}
               >
                  Reset
               </PrimaryButton>
               <PrimaryButton
                  onClick={() => setFilterDialogOpen(false)}
                  style={{
                     color: '#181818',
                     background: '#FFD05B',
                     fontSize: '20px',
                     width: '100%',
                     borderRadius: '0',
                  }}
                  IconStart={CheckIcon}
               >
                  Apply
               </PrimaryButton>
            </CustomBottomBar>
         </DraggableBottomDialog>

         {/* Sort :- reset and apply */}
         <DraggableBottomDialog
            open={sortDialogOpen}
            handleClose={() => setSortDialogOpen(false)}
            bar={true}
            text={'Sort'}
         ></DraggableBottomDialog>

         {mobileData?.length === 0 && <center>No result found!!</center>}

         {mobileData?.constructor === Array &&
            mobileData?.map((item, id) => {
               return (
                  <Fragment>
                     <Card
                        sx={{
                           minWidth: 275,
                           boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.18)',
                           marginBottom: '15px',
                           position: 'relative',
                           backgroundColor: `${
                              parseInt(id) % 2 !== 0 ? '#fff' : '#fff'
                           }`,
                        }}
                     >
                        <CardContent
                           onClick={() => {
                              handleRowClick(item);
                           }}
                           sx={{ maxHeight: '350px', padding: 0 }}
                        >
                           <Box
                              // className='px-3 pt-3'
                              sx={{
                                 px: '0.75rem',
                                 pt: '0.75rem',
                              }}
                              key={columns[0].accessor}
                              style={{ width: '50%' }}
                           >
                              <Typography
                                 sx={{ fontSize: 14 }}
                                 color='text.secondary'
                                 gutterBottom
                              >
                                 <img
                                    src={
                                       columns[0].accessor.includes('name')
                                          ? BusinessDetail
                                          : columns[0].accessor.includes(
                                               'status'
                                            )
                                          ? Status
                                          : ProductName
                                    }
                                    width='16'
                                    alt='product name'
                                 />
                                 &nbsp; {columns[0].Header}
                              </Typography>
                              <Typography
                                 variant='h5'
                                 component='div'
                                 sx={{
                                    color: '#000000',
                                    fontStyle: 'normal',
                                    fontSize: '15px',
                                    fontWeight: '500',
                                    ml: 3,
                                 }}
                              >
                                 {columns[0].accessor.includes('status') ? (
                                    <LeadStatus
                                       boxVariant={item[
                                          columns[0].accessor
                                       ].toUpperCase()}
                                    />
                                 ) : (
                                    item[columns[0].accessor] || 'N/A'
                                 )}
                              </Typography>
                           </Box>
                           <Box
                              // className='d-flex flex-column flex-wrap pt-3 px-3'
                              sx={{
                                 px: '0.75rem',
                                 pt: '0.75rem',
                                 display: 'flex',
                                 flexDirection: 'column',
                                 flexWrap: 'wrap',
                                 alignContent: 'space-between',
                                 maxHeight: `${
                                    columns?.length < 8 ? '250px' : '300px'
                                 }`,
                              }}
                           >
                              {columns.map((column, index) => (
                                 <Fragment>
                                    {index > 0 && (
                                       <Box
                                          key={column.accessor}
                                          sx={{
                                             mb: '0.75rem',
                                             width: '50%',
                                          }}
                                       >
                                          <Typography
                                             sx={{ fontSize: 14 }}
                                             color='text.secondary'
                                             gutterBottom
                                          >
                                             {column.accessor.includes(
                                                'location'
                                             ) ? (
                                                <LocationOnOutlinedIcon fontSize='small' />
                                             ) : column.accessor.includes(
                                                  'progress'
                                               ) ? (
                                                <MonetizationOnIcon fontSize='small' />
                                             ) : column.accessor.includes(
                                                  'date'
                                               ) ? (
                                                <EventIcon fontSize='small' />
                                             ) : (
                                                <img
                                                   src={
                                                      column.accessor.includes(
                                                         'name'
                                                      )
                                                         ? BusinessDetail
                                                         : column.accessor.includes(
                                                              'status'
                                                           )
                                                         ? Status
                                                         : ProductName
                                                   }
                                                   width='16'
                                                   alt='product name'
                                                />
                                             )}
                                             &nbsp; {column.Header}
                                          </Typography>
                                          <Typography
                                             variant='h5'
                                             component='div'
                                             sx={{
                                                color: '#000000',
                                                fontStyle: 'normal',
                                                fontSize: '15px',
                                                fontWeight: '500',
                                                ml: 3,
                                             }}
                                          >
                                             {column.accessor.includes(
                                                'status'
                                             ) ? (
                                                <LeadStatus
                                                   boxVariant={item[
                                                      column.accessor
                                                   ].toUpperCase()}
                                                />
                                             ) : (
                                                item[column.accessor] || 'N/A'
                                             )}
                                          </Typography>
                                       </Box>
                                    )}
                                 </Fragment>
                              ))}
                           </Box>
                        </CardContent>
                        <div
                           style={{
                              position: 'absolute',
                              top: '0',
                              right: '0',
                              padding: '1rem',
                           }}
                        >
                           {locationNeed && (
                              <Checkbox
                                 sx={{ zIndex: 1 }}
                                 onClick={() => checkBoxClick(id)}
                              />
                           )}
                        </div>
                     </Card>

                     {reminderModalOpen && (
                        <SolrufModal
                           open={reminderModalOpen}
                           onClose={() => setReminderModalOpen(false)}
                        >
                           <ReminderModalContent
                              customerId={rowData?.customer?.customer_id}
                           />
                        </SolrufModal>
                     )}

                     {customerDetailDrawer && (
                        <CustomerDetailsDrawer
                           rightDrawerOpen={customerDetailDrawer}
                           setRightDrawerOpen={setCustomerDetailDrawer}
                           customerId={drawerData.customerId}
                        />
                     )}

                     {userEnquiryDetailDrawer && (
                        <EnquiryDetailsForUser
                           rightDrawerOpen={userEnquiryDetailDrawer}
                           setRightDrawerOpen={setUserEnquiryDetailDrawer}
                           d
                        />
                     )}

                     {vendorEnquiryDetailDrawer && (
                        <EnquiryDetailsForVendor
                           rightDrawerOpen={vendorEnquiryDetailDrawer}
                           setRightDrawerOpen={setVendorEnquiryDetailDrawer}
                           drawerData={drawerData}
                           setDrawerData={setDrawerData}
                        />
                     )}

                     {purchaseDetailsDrawer && (
                        <PurchaseDetailsDrawer
                           purchaseDrawerData={purchaseDrawerData}
                           rightDrawerOpen={purchaseDetailsDrawer}
                           setRightDrawerOpen={setPurchaseDetailsDrawer}
                        />
                     )}
                     {salesDetailsDrawer && (
                        <SalesDetailsDrawer
                           setRightDrawerOpen={setSalesDetailsDrawer}
                           rightDrawerOpen={salesDetailsDrawer}
                           salesDrawerData={salesDrawerData}
                        />
                     )}
                  </Fragment>
               );
            })}
         <br />
      </div>
   );
}

export default GlobalMobileTable;
