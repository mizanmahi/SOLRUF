import React, { Fragment, useEffect, useMemo, useState } from 'react';
import GlobalTable from '../../../components/MyTables/GlobalTable';
import GlobalMobileTable from '../../../components/MyTables/GlobalMobileTable';
import TabBtn from '../../../components/SmallTab/TabBtn';
import { axiAuth } from '../../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
   setSalesTabOpen,
   setVendorEnquiriesData,
   setVendorSalesData,
} from '../../../redux/slices/tableSlice';

import { Box, Stack, useMediaQuery } from '@mui/material';
import AntDateRange from '../../../components/Custom/AntDateRange/AntDateRange';

import CategoryFilter from '../../../components/CategoryFilter/CategoryFilter';
import useCategories from '../../../hooks/useCategories';
import { formateToSqlDateWithMoment } from '../../../utils/formateToSqlDateTime';
import CountryFilter from '../../../components/CountryFilter/CountryFilter';
import TableSearchBar from '../../../components/TableSearchBar/TableSearchBar';
import CustomBottomBar from '../../../components/CustomBottomBar/CustomBottomBar';
import PrimaryButton from '../../../components/Custom/PrimaryButton/PrimaryButton';
import DraggableBottomDialog from '../../../components/Custom/BottomDialog/DraggableBottomDialog';
import DateRangePickerNpm from '../../../components/Custom/DateRangePickerNpm/DateRangePickerNpm';

const enquiryColumns = [
   {
      Header: 'Enquiry ID',
      accessor: 'enquiry_id',
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

const salesColumns = [
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

function SalesEnquiries() {
   const [currentTab, setCurrentTab] = useState('Sales');

   const onTabChange = () => {
      setCurrentTab(currentTab === 'Sales' ? 'Enquiries' : 'Sales');
      setSearchTerm('');
      setActiveCategory('');
      setActiveState('');
   };

   const dispatch = useDispatch();

   const matchSm = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   const [vendorEnquiries, setVendorEnquiries] = useState([]);
   const [sales, setSales] = useState([]);
   // const [loading, setLoading] = useState(false);

   const { vendorEnquiries: vendorEnquiryFromRedux } = useSelector(
      (state) => state.tableData
   );
   const { vendorSalesData } = useSelector((state) => state.tableData);

   useEffect(() => {
      setVendorEnquiries(vendorEnquiryFromRedux);
   }, [vendorEnquiryFromRedux]);

   useEffect(() => {
      setSales(vendorSalesData);
   }, [vendorSalesData]);

   useEffect(() => {
      dispatch(setSalesTabOpen(currentTab === 'Sales'));
   }, [currentTab, dispatch]);

   const [searchTerm, setSearchTerm] = useState('');

   const vendorEnquiriesWithPagination = async (
      pageIndex,
      searchTerm,
      filters
   ) => {
      let url = `api/vendor/enquiries?page=${pageIndex + 1}&length=${5}`;

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
         url = `${url}&state=${filters.state}`;
      }
      if (filters.category) {
         url = `${url}&category_id=${filters.category}`;
      }

      // setLoading(true);
      try {
         const { data } = await axiAuth.get(url);
         const csData = data.enquires.map((enquiry) => {
            return {
               ...enquiry,
               location: `${enquiry.user_address.city}, ${enquiry.user_address.state}`,
               product_name: enquiry.product.other.productName,
               status: enquiry.status === 'Open' ? 'OPEN' : 'CANCELLED',
            };
         });
         setVendorEnquiries(csData);
         console.log('here comes ==>>==>>==>>');
         dispatch(setVendorEnquiriesData(csData));
         const pages = data.pagination.last_page;
         // setLoading(false);
         return { csData, pages };
      } catch (error) {
         console.log(error);
         // setLoading(false);
         return { csData: [], pages: 0 };
      }
   };

   const vendorSalesDataWithPagination = async (
      pageIndex,
      searchTerm,
      filters
   ) => {
      console.log({ pageIndex, searchTerm, filters });

      let url = `api/vendor/sales?page=${pageIndex + 1}&length=${5}`;

      if (searchTerm) {
         url = `${url}&search=${searchTerm}`;
      }

      console.log(filters.date);

      const { from_date, to_date } = filters.date;

      if (from_date && to_date) {
         const fromDate = formateToSqlDateWithMoment(date.from_date).split(
            ' '
         )[0];
         const toDate = formateToSqlDateWithMoment(date.to_date).split(' ')[0];
         url = `${url}&from_date=${fromDate}&to_date=${toDate}`;
      }

      if (filters.state) {
         url = `${url}&state=${filters.state}`;
      }

      // setLoading(true);
      try {
         const { data } = await axiAuth.get(url);

         console.log(data);
         const csData = data.orders.map((order, i) => {
            return {
               quantity: order?.quantity,
               product_name: order?.details[0].product?.productName,
               progress: '-',
               status: order?.status === 'open' ? 'SALES' : 'CANCELLED',
               id: order.order_id,
               delivery_date: order.expected_delivery,
               location: `${order.customer_details?.city}, ${order.customer_details?.state}`,
               others: {
                  ...order,
               },
            };
         });
         setSales(csData);
         dispatch(setVendorSalesData(csData));
         const pages = data.pagination.last_page;
         // setLoading(false);
         return { csData, pages };
      } catch (error) {
         console.log(error);
         // setLoading(false);
         return { csData: [], pages: 0 };
      }
   };

   const { categories } = useCategories('product', null);
   const [activeCategory, setActiveCategory] = useState(null);

   const { statesOfIndia } = useSelector((state) => state.utils);
   const [activeState, setActiveState] = useState(null);

   const [date, setDate] = useState(new Date());
   console.log({date});

   const [mobileDate, onChange] = useState([new Date(), new Date()]);
   // console.log(mobileDate);
   // console.log(matchSm);

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

   return (
      <Box
         sx={{
            width: '100%',
            position: 'relative',
            // backgroundColor: 'red',
         }}
      >
         <TabBtn tabChange={onTabChange} tabName={['Sales', 'Enquiries']} />

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
            sx={{ ml: 2, mt: 2, display: { xs: 'none', md: 'flex' } }}
            direction='row'
            spacing={2}
         >
            <Box sx={{ width: '380px' }}>
               <AntDateRange date={date} setDate={setDate} />
            </Box>
            {/* <Box>
               <DateRangePickerNpm />
            </Box> */}
            {currentTab === 'Enquiries' && (
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

         {currentTab === 'Sales' ? (
            <>
               <GlobalMobileTable columns={salesColumns} data={sales} />
               <GlobalTable
                  columns={salesColumns}
                  data={sales}
                  setPagination={vendorSalesDataWithPagination}
                  searchTerm={searchTerm}
                  filters={filters}
                  tab={currentTab}
               />
            </>
         ) : (
            <>
               <GlobalMobileTable
                  columns={enquiryColumns}
                  data={vendorEnquiries}
               />
               <GlobalTable
                  columns={enquiryColumns}
                  data={vendorEnquiries}
                  setPagination={vendorEnquiriesWithPagination}
                  searchTerm={searchTerm}
                  filters={filters}
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
               {currentTab === 'Enquiries' && (
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

export default SalesEnquiries;
