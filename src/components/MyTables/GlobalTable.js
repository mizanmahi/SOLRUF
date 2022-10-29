import React, { Fragment, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
   useTable,
   useSortBy,
   useRowSelect,
   useGlobalFilter,
   usePagination,
} from 'react-table';
import { Checkbox } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './GlobalTable.css';
import LeadStatus from '../../pages/LeadStatus/LeadStatus';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router';
import MyPagination from '../CustomPagination/MyPagination';
import CustomerDetailsDrawer from '../CustomerDetailsDrawer/CustomerDetailsDrawer';
import EnquiryDetailsForUser from '../EnquiryDetailsForUser/EnquiryDetailsForUser';
import EnquiryDetailsForVendor from '../EnquiryDetailsForVendor/EnquiryDetailsForVendor';
import { useDispatch, useSelector } from 'react-redux';
import { setEnquiryDetails } from '../../redux/slices/userSlice';
import SolrufModal from '../Custom/SolrufModal/SolrufModal';
import ReminderModalContent from '../ReminderModalContent/ReminderModalContent';
import PurchaseDetailsDrawer from '../PurchaseDetailsDrawer/PurchaseDetailsDrawer';
import SalesDetailsDrawer from '../SalesDetailsDrawer/SalesDetailsDrawer';
import { axiAuth } from '../../utils/axiosInstance';
import { setDeleteUserHandler } from '../../redux/slices/tableSlice';
import ConsultationModalContent from '../ConsultationModalContent/ConsultationModalContent';

const Styles = styled.div`
   padding: 1rem;
   display: flex;
   justify-content: center;

   table {
      border-collapse: separate;
      border-spacing: 0 1em;

      thead {
         color: #000000;
         font-size: 18px;
         background-color: #ffffff;
         box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.23);
         padding: 20px 0px 10px 0px;
         border-radius: 8px;
      }

      td:first-child,
      th:first-child {
         border-radius: 8px 0px 0px 8px;
      }

      td:last-child,
      th:last-child {
         border-radius: 0px 8px 8px 0px;
      }

      tbody tr {
         margin: 0;
         color: #000000;
         font-weight: 400;
         background: #ffffff;
         font-family: 'Inter';
         font-size: 17px;
      }
   }
`;

// ============================================ DeskTop View =============================================
function Table({
   columns,
   data,
   setData,
   pageCount: controlledPageCount,
   fetchData,
   basic,
   searchTerm,
   filters,
}) {
   const IndeterminateCheckbox = React.forwardRef(
      ({ indeterminate, ...rest }, ref) => {
         const defaultRef = React.useRef();
         const resolvedRef = ref || defaultRef;

         useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
         }, [resolvedRef, indeterminate]);

         return (
            <>
               <Checkbox
                  ref={resolvedRef}
                  {...rest}
                  onClick={(e) => {
                     e.stopPropagation();
                  }}
               />
               {/* <input type="radio" ref={resolvedRef} {...rest} /> */}
            </>
         );
      }
   );
   const [rowData, setRowData] = useState({});

   const location = useLocation();
   const locationNeed = location.pathname === '/vendor/dashboard/customerLeads';

   const [customerDetailDrawer, setCustomerDetailDrawer] = useState(false);
   const [userEnquiryDetailDrawer, setUserEnquiryDetailDrawer] =
      useState(false);
   const [vendorEnquiryDetailDrawer, setVendorEnquiryDetailDrawer] =
      useState(false);

   const [purchaseDetailsDrawer, setPurchaseDetailsDrawer] = useState(false);
   const [salesDetailsDrawer, setSalesDetailsDrawer] = useState(false);

   const [purchaseDrawerData, setPurchaseDrawerData] = useState({});
   const [salesDrawerData, setSalesDrawerData] = useState({});

   // const { customerLeads } = useSelector((state) => state.tableData);

   const [drawerData, setDrawerData] = useState({
      customerId: {},
      enquiryDetailsForUser: {},
      enquiryDetailsForVendor: {},
   });

   const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      state: { selectedRowIds, pageIndex, pageSize },

      prepareRow,
      page,
      pageOptions,
      gotoPage,
   } = useTable(
      {
         autoResetPage: false,
         columns,
         data: data,
         initialState: { pageIndex: 0, pageSize: 10 },
         manualPagination: true,
         pageCount: controlledPageCount,
      },
      useGlobalFilter,
      useSortBy,
      usePagination,
      useRowSelect,
      (hooks) => {
         if (locationNeed) {
            hooks.visibleColumns.push((columns) => [
               {
                  id: 'selection',
                  Header: ({ getToggleAllRowsSelectedProps }) => (
                     <div>
                        <IndeterminateCheckbox
                           {...getToggleAllRowsSelectedProps()}
                        />
                     </div>
                  ),
                  Cell: ({ row }) => (
                     <div>
                        <IndeterminateCheckbox
                           {...row.getToggleRowSelectedProps()}
                        />
                     </div>
                  ),
               },
               ...columns,
            ]);
         }
      }
   );

   //  ! fetching when the page is changed and the search term is changed
   React.useEffect(() => {
      console.log('ran fetch data');
      fetchData({ pageIndex, pageSize, searchTerm, filters });
   }, [fetchData, pageIndex, pageSize, searchTerm, filters]);

   // console.log(drawerData);

   const { remindersTabOpen, purchaseTabOpen, salesTabOpen } = useSelector(
      (state) => state.tableData
   );

   const handleRowClick = (row) => {
      if (location.pathname === '/vendor/dashboard/customerLeads') {
         setCustomerDetailDrawer(true);
         setDrawerData({
            ...drawerData,
            customerId: row.values.customer_id
               ? row.values.customer_id
               : row.original.customer.customer_id,
         });
      } else if (location.pathname === '/vendor/dashboard/sale') {
         if (salesTabOpen) {
            setSalesDrawerData(row.original);
            setSalesDetailsDrawer(true);
         } else {
            setVendorEnquiryDetailDrawer(true);
            setDrawerData({
               ...drawerData,
               enquiryDetailsForVendor: row.original,
            });
         }
      } else if (location.pathname === '/user-dashboard/purchase-enquiries') {
         if (purchaseTabOpen) {
            setPurchaseDrawerData(row.original);
            setPurchaseDetailsDrawer(true);
         } else {
            dispatch(
               setEnquiryDetails(data.find((item) => item.id === row.values.id))
            );
            setUserEnquiryDetailDrawer(true);
         }
      } else if (location.pathname === '/vendor/dashboard/purchase') {
         if (purchaseTabOpen) {
            setPurchaseDrawerData(row.original);
            setPurchaseDetailsDrawer(true);
         } else {
            dispatch(
               setEnquiryDetails(data.find((item) => item.id === row.values.id))
            );
            setUserEnquiryDetailDrawer(true);
         }
      } else if (location.pathname === '/vendor/dashboard/consultation') {
         if (remindersTabOpen) {
            // if the reminder tab is true then don't open the drawer instead show a modal
            setRowData(row);
            setReminderModalOpen(true);
         }else {
            setConsultationModalOpen(true)
            console.log(row)
            setRowData(row);
         }
      }
   };

   const deleteUserHandler = (event) => {
      if (Object.keys(selectedRowIds).length !== 0) {
         const customer_ids = [];
         Object.keys(selectedRowIds).forEach((key) => {
            customer_ids.push(data[key].customer_id);
         });

         console.log(customer_ids);

         axiAuth
            .post(`api/vendor/customers/mass-delete`, { customer_ids })
            .then((res) => {
               const removeByIndexes = (array, indexes) =>
                  array.filter((_, i) => !indexes.includes(i));

               const newData = removeByIndexes(
                  data,
                  Object.keys(selectedRowIds).map((x) => parseInt(x, 10))
               );
               setData(newData);
               toast.success('Customer successfully deleted!');
            })
            .catch((err) => {
               console.log(err);
            });
      }
   };

   useEffect(() => {
      dispatch(setDeleteUserHandler(deleteUserHandler));
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectedRowIds]);

   const [reminderModalOpen, setReminderModalOpen] = useState(false);
   const [consultationModalOpen, setConsultationModalOpen] = useState(false);

   const dispatch = useDispatch();

   return (
      <>
         <div id='win_table__content'>
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

            {/* <GlobalSearchFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            data={data}
            columns={columns}
            deleteUserHandler={deleteUserHandler}
            basic={basic}
         /> */}

            {/*  custom filters */}

            <Styles>
               <table {...getTableProps()} style={{ width: '100%' }}>
                  <thead>
                     {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                           {headerGroup.headers.map((column, index) => (
                              // Add the sorting props to control sorting. For this example
                              // we can add them into the header props
                              <th
                                 {...column.getHeaderProps(
                                    column.getSortByToggleProps()
                                 )}
                                 style={
                                    !locationNeed && index === 0
                                       ? { padding: '10px' }
                                       : {}
                                 }
                              >
                                 {column.render('Header')}
                                 {/* Add a sort direction indicator */}
                                 <span>
                                    {column.isSorted ? (
                                       column.isSortedDesc ? (
                                          <ArrowDownwardIcon
                                             fontSize='small'
                                             // className='text-muted'
                                             sx={{
                                                color: '#4D4D4D',
                                             }}
                                          />
                                       ) : (
                                          <ArrowUpwardIcon
                                             fontSize='small'
                                             sx={{
                                                color: '#4D4D4D',
                                             }}
                                          />
                                       )
                                    ) : column.id === 'selection' ? (
                                       ''
                                    ) : (
                                       <ArrowUpwardIcon
                                          fontSize='small'
                                          sx={{
                                             color: '#4D4D4D',
                                          }}
                                       />
                                    )}
                                 </span>
                              </th>
                           ))}
                        </tr>
                     ))}
                  </thead>
                  <tbody {...getTableBodyProps()}>
                     {page.map((row, i) => {
                        prepareRow(row);
                        return (
                           <tr
                              className='table__tr'
                              onClick={() => handleRowClick(row)}
                              {...row.getRowProps()}
                           >
                              {row.cells.map((cell, index) => {
                                 return (
                                    <Fragment>
                                       {cell.column.id === 'status' ? (
                                          <td
                                             {...cell.getCellProps()}
                                             style={{ textAlign: 'center' }}
                                          >
                                             <LeadStatus
                                                boxVariant={
                                                   cell.render('Cell').props
                                                      .cell.value
                                                }
                                             />
                                          </td>
                                       ) : (
                                          <td
                                             style={
                                                !locationNeed && index === 0
                                                   ? { padding: '10px' }
                                                   : { textAlign: 'center' }
                                             }
                                             {...cell.getCellProps()}
                                          >
                                             {cell.render('Cell')}
                                          </td>
                                       )}
                                    </Fragment>
                                 );
                              })}
                           </tr>
                        );
                     })}
                  </tbody>
               </table>
            </Styles>

            {/* ============ reminder details modal ============ */}
            <SolrufModal
               sx={{
                  maxWidth: '600px',
               }}
               open={reminderModalOpen}
               onClose={() => setReminderModalOpen(false)}
            >
               <ReminderModalContent
                  customerId={rowData?.original?.customer?.customer_id}
               />
            </SolrufModal>

            {/* ============ consultation details modal ============ */}
            <SolrufModal
               sx={{
                  maxWidth: '600px',
               }}
               open={consultationModalOpen}
               onClose={() => setConsultationModalOpen(false)}
            >
               <ConsultationModalContent
                  data={rowData?.original}
               />
            </SolrufModal>
         </div>
         <MyPagination
            sx={{ mb: [8, 8, 0] }}
            totalPages={pageOptions}
            gotoPage={gotoPage}
         />
      </>
   );
}

const GlobalTable = ({
   columns,
   data,
   setPagination,
   basic,
   tab,
   searchTerm,
   filters,
}) => {
   const [tableData, setTableData] = React.useState([]);

   const [pageCount, setPageCount] = React.useState(0);

   // eslint-disable-next-line
   const setPaginationRef = useCallback(
      setPagination,
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [tab]
   );

   const fetchData = useCallback(
      async ({ pageIndex, searchTerm, filters }) => {
         if (setPaginationRef) {
            const { csData, pages } = await setPaginationRef(
               pageIndex,
               searchTerm,
               filters
            );
            setTableData(csData);
            setPageCount(pages);
         }
      },
      [setPaginationRef]
   );
   // page size could be used here
   // const fetchData = useCallback(
   //    async ({ pageSize, pageIndex, searchTerm, filters }) => {
   //       if (setPaginationRef) {
   //          const { csData, pages } = await setPaginationRef(
   //             pageIndex,
   //             searchTerm,
   //             filters
   //          );
   //          setTableData(csData);
   //          setPageCount(pages);
   //       }
   //    },
   //    [setPaginationRef]
   // );

   useEffect(() => {
      if (data && data.constructor === Array) {
         setTableData(data);
      } else {
         setTableData([]);
      }
   }, [data]);

   return (
      <Fragment>
         <Table
            columns={columns}
            data={tableData}
            fetchData={fetchData}
            setData={setTableData}
            pageCount={pageCount}
            searchTerm={searchTerm}
            filters={filters}
            basic={basic}
         />
      </Fragment>
   );
};

export default GlobalTable;
