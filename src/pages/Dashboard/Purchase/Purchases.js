import React, { Fragment, useEffect, useMemo, useState } from 'react';
import GlobalTable from '../../../components/MyTables/GlobalTable';
import GlobalMobileTable from '../../../components/MyTables/GlobalMobileTable';
import TabBtn from '../../../components/SmallTab/TabBtn';
import { axiAuth } from '../../../utils/axiosInstance';
import BackdropLoader from '../../../components/Custom/BackdropLoader/BackdropLoader';
import { useDispatch } from 'react-redux';
import {
   setPurchaseTabOpen,
   setUserEnquiriesData,
   setUserOrdersData,
} from '../../../redux/slices/tableSlice';
import { useSelector } from 'react-redux';
import { Box, Stack, useMediaQuery } from '@mui/material';
import AntDateRange from '../../../components/Custom/AntDateRange/AntDateRange';
import useCategories from '../../../hooks/useCategories';
import CategoryFilter from '../../../components/CategoryFilter/CategoryFilter';
import CountryFilter from '../../../components/CountryFilter/CountryFilter';
import { formateToSqlDateWithMoment } from '../../../utils/formateToSqlDateTime';
import TableSearchBar from '../../../components/TableSearchBar/TableSearchBar';
import CustomBottomBar from '../../../components/CustomBottomBar/CustomBottomBar';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';
import DraggableBottomDialog from '../../../components/Custom/BottomDialog/DraggableBottomDialog';
import DateRangePickerNpm from '../../../components/Custom/DateRangePickerNpm/DateRangePickerNpm';

const purchaseColumns = [
   {
      Header: 'Order ID',
      accessor: 'id',
   },
   {
      Header: 'Product Name',
      accessor: 'product_name',
   },
   {
      Header: 'Quantity',
      accessor: 'quantity',
   },
   {
      Header: 'Order Date',
      accessor: 'delivery_date',
   },
   {
      Header: 'Delivery Location',
      accessor: 'location',
   },
   {
      Header: 'Amount (INR)',
      accessor: 'progress',
   },
   {
      Header: 'Status',
      accessor: 'status',
   },
];
const enquiryColumns = [
   {
      Header: 'Enquiry ID',
      accessor: 'id',
   },
   {
      Header: 'Product Name',
      accessor: 'product_name',
   },
   {
      Header: 'Quantity',
      accessor: 'quantity',
   },
   {
      Header: 'Enquiry Date',
      accessor: 'delivery_date',
   },
   {
      Header: 'Delivery Location',
      accessor: 'location',
   },
   {
      Header: 'Amount (INR)',
      accessor: 'progress',
   },
   {
      Header: 'Status',
      accessor: 'status',
   },
];

function Purchases() {
   const [currentTab, setCurrentTab] = useState('Purchase');

   const dispatch = useDispatch();
   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [enquiries, setEnquiries] = useState([]);
   const [purchases, setPurchases] = useState([]);
   const [loading, setLoading] = useState(true);

   const { userEnquiries } = useSelector((state) => state.tableData);
   const { userOrdersData } = useSelector((state) => state.tableData);

   useEffect(() => {
      setEnquiries(userEnquiries);
   }, [userEnquiries]);

   useEffect(() => {
      setPurchases(userOrdersData);
   }, [userOrdersData]);

   useEffect(() => {
      dispatch(setPurchaseTabOpen(currentTab === 'Purchase'));
   }, [currentTab, dispatch]);

   const [searchTerm, setSearchTerm] = useState('');

   const { categories } = useCategories('product', null);
   const [activeCategory, setActiveCategory] = useState(null);

   const { statesOfIndia } = useSelector((state) => state.utils);
   const [activeState, setActiveState] = useState(null);

   const [date, setDate] = useState(new Date());

   const onTabChange = () => {
      setCurrentTab(currentTab === 'Purchase' ? 'Enquiry' : 'Purchase');
      setSearchTerm('');
      setActiveCategory('');
      setActiveState('');
   };

   const userEnquiriesWithPagination = async (
      pageIndex,
      searchTerm,
      filters
   ) => {
      let url = `api/enquiries?page=${pageIndex + 1}&length=${10}`;

      if (searchTerm) {
         url += `&search=${searchTerm}`;
      }

      const { from_date, to_date } = filters.date;

      if (from_date && to_date) {
         const fromDate = formateToSqlDateWithMoment(date.from_date).split(
            ' '
         )[0];
         const toDate = formateToSqlDateWithMoment(date.to_date).split(' ')[0];
         url += `&from_date=${fromDate}&to_date=${toDate}`;
      }

      if (filters.category) {
         url += `&category_id=${filters.category}`;
      }

      if (filters.state) {
         url += `&state=${filters.state}`;
      }
      setLoading(true);
      try {
         const { data } = await axiAuth.get(url);
         const csData = data.enquires.map((enquiry, i) => {
            return {
               quantity: enquiry?.quantity,
               product_name: enquiry?.product?.other?.productName,
               progress: '-',
               status: enquiry?.status === 'Open' ? 'ENQUIRY' : 'CANCELLED',
               id: enquiry.enquiry_id,
               delivery_date: enquiry.delivery_date,
               location: `${enquiry.user_address?.city}, ${enquiry.user_address?.state}`,
               others: {
                  ...enquiry,
               },
            };
         });
         setEnquiries(csData);
         dispatch(setUserEnquiriesData(csData));
         const pages = data.pagination.last_page;
         setLoading(false);
         return { csData, pages };
      } catch (error) {
         console.log(error);
         setLoading(false);
         return { csData: [], pages: 0 };
      }
   };

   const selectProductName = (orderType, order) => {
      let productName = '';
      if (orderType === 'ENQUIRY') {
         productName = order?.details[0]?.product?.productName;
      } else {
         const names = order?.details.map(({ product }) => {
            return product?.product_meta?.product_name;
         });

         productName =
            names.length > 1
               ? `${names[0]} + ${names.length - 1} more..`
               : names[0];
      }

      return productName;
   };

   const userPurchaseDataWithPagination = async (
      pageIndex,
      searchTerm,
      filters
   ) => {
      let url = `api/orders?page=${pageIndex + 1}&length=${10}`;

      if (searchTerm) {
         url += `&search=${searchTerm}`;
      }

      const { from_date, to_date } = filters.date;

      if (from_date && to_date) {
         const fromDate = formateToSqlDateWithMoment(date.from_date).split(
            ' '
         )[0];
         const toDate = formateToSqlDateWithMoment(date.to_date).split(' ')[0];
         url += `&from_date=${fromDate}&to_date=${toDate}`;
      }

      if (filters.state) {
         url += `&state=${filters.state}`;
      }

      setLoading(true);

      try {
         const { data } = await axiAuth.get(url);
         const csData = data.orders.map((order, i) => {
            console.log(order);
            return {
               quantity: order?.quantity,
               product_name: selectProductName(order?.type, order),
               progress: '-',
               status: order?.status === 'open' ? 'OPEN' : 'CONFIRMED',
               id: order.order_id,
               delivery_date: order.expected_delivery,
               location: `${order.customer_details?.city}, ${order.customer_details?.state}`,
               others: {
                  ...order,
               },
            };
         });
         setPurchases(csData);
         console.log(csData);
         dispatch(setUserOrdersData(csData));
         const pages = data.pagination.last_page;
         setLoading(false);
         return { csData, pages };
      } catch (error) {
         console.log(error);
         setLoading(false);
         return { csData: [], pages: 0 };
      }
   };

   const [mobileDate, onChange] = useState([null, null]);

   const filters = useMemo(() => {
      return {
         date: matchSm
            ? mobileDate?.length > 0
               ? { from_date: mobileDate[0], to_date: mobileDate[1] }
               : { from_date: null, to_date: null }
            : date,
         category: activeCategory,
         state: activeState,
      };
   }, [activeCategory, date, activeState, mobileDate, matchSm]);
   const [filterDialogOpen, setFilterDialogOpen] = useState(false);

   console.log(filters);

   return (
      <Box>
         {/* tabs */}

         <TabBtn
            tabChange={onTabChange}
            orientation='vertical'
            tabName={['Purchase', 'Enquiry']}
         />

         {/*  loader  */}
         {loading && <BackdropLoader />}

         <Box
            sx={{
               maxWidth: '900px',
               width: '100%',
               margin: '0 auto',
               my: '20px',
               px: '0.5rem',
            }}
         >
            <TableSearchBar
               placeholder='search'
               searchTerm={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
            />
         </Box>

         <Stack
            sx={{
               ml: 2,
               mt: 2,
               display: {
                  xs: 'none',
                  md: 'flex',
               },
            }}
            direction='row'
            spacing={2}
         >
            <Box sx={{ width: '290px' }}>
               <AntDateRange date={date} setDate={setDate} />
            </Box>
            {currentTab !== 'Purchase' && (
               <Box sx={{ maxWidth: '500px' }}>
                  {categories.length > 0 && (
                     <CategoryFilter
                        categories={categories}
                        activeCategory={activeCategory}
                        setActiveCategory={setActiveCategory}
                     />
                  )}
               </Box>
            )}

            <Box sx={{ maxWidth: '500px' }}>
               {statesOfIndia.length > 0 && (
                  <CountryFilter
                     states={statesOfIndia}
                     activeState={activeState}
                     setActiveState={setActiveState}
                  />
               )}
            </Box>
         </Stack>

         {currentTab === 'Purchase' ? (
            <>
               <GlobalMobileTable columns={purchaseColumns} data={purchases} />
               <GlobalTable
                  columns={purchaseColumns}
                  data={purchases}
                  setPagination={userPurchaseDataWithPagination}
                  tab={currentTab}
                  filters={filters}
                  searchTerm={searchTerm}
               />
            </>
         ) : (
            <>
               <GlobalMobileTable columns={enquiryColumns} data={enquiries} />
               <GlobalTable
                  columns={enquiryColumns}
                  data={enquiries}
                  setPagination={userEnquiriesWithPagination}
                  filters={filters}
                  searchTerm={searchTerm}
               />
            </>
         )}
         <DraggableBottomDialog
            open={filterDialogOpen}
            handleClose={() => setFilterDialogOpen(false)}
            bar={true}
            // text={'Sort'}
         >
            <Stack sx={{ mt: 4, px: 1 }} rowGap={1}>
               <Box>
                  <DateRangePickerNpm
                     mobileDate={mobileDate}
                     onChange={onChange}
                  />
               </Box>
               {currentTab === 'Enquiry' && (
                  <>
                     {categories.length > 0 && (
                        <CategoryFilter
                           sx={{
                              maxWidth: '100%',
                           }}
                           categories={categories}
                           activeCategory={activeCategory}
                           setActiveCategory={setActiveCategory}
                        />
                     )}
                  </>
               )}

               {statesOfIndia.length > 0 && (
                  <CountryFilter
                     sx={{
                        maxWidth: '100%',
                     }}
                     states={statesOfIndia}
                     activeState={activeState}
                     setActiveState={setActiveState}
                  />
               )}
            </Stack>
         </DraggableBottomDialog>

         <CustomBottomBar>
            <PrimaryButton
               onClick={() => setFilterDialogOpen(true)}
               sx={{
                  color: '#F3F3F3',
                  background: '#4D4D4D',
                  borderRadius: '0',
                  fontSize: '18px',
                  width: '100%',
               }}
            >
               Filter
            </PrimaryButton>
         </CustomBottomBar>
      </Box>
   );
}

export default Purchases;
