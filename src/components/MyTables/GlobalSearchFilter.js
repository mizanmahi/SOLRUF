import { Fragment, useState } from 'react';
import './GlobalTable.css';
import { Box, IconButton } from '@mui/material';
import { useAsyncDebounce } from 'react-table';
import DeleteIcon from '@mui/icons-material/Delete';
import { useLocation } from 'react-router-dom';
import SecondarySearchBar from '../../components/SecondarySearch/SecondarySearchBar';
import CreateCustomerDrawer from '../CreateCustomerDrawer/CreateCustomerDrawer';
import PrimaryButton from '../Custom/PrimaryButton/PrimaryButton';
import useAuth from '../../hooks/useAuth';

export default function GlobalSearchFilter({
   preGlobalFilteredRows,
   globalFilter,
   setGlobalFilter,
   data,
   columns,
   deleteUserHandler,
   basic,
}) {
   const count = preGlobalFilteredRows.length;
   const [customerCreateDrawer, setCustomerCreateDrawer] = useState(false);
   const location = useLocation();
   const onChange = useAsyncDebounce((value) => {
      setGlobalFilter(value || undefined);
   }, 200);

   const { role } = useAuth();

   const searchHandler = (e) => {
      onChange(e.target.value);
   };

   return (
      <Fragment>
         <div class='search__filter__section'>
            <div className='main'>
               <Box
                  className='has-search'
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                  }}
               >
                  <SecondarySearchBar
                     onChangeVal={searchHandler}
                     placeHolder={`Search ${count} records...`}
                  />
               </Box>
            </div>

            <Box
               className='btn__icon'
               sx={{
                  display: 'flex',
                  mr: 2,
                  height: '25%',
               }}
            >
               {location.pathname === '/vendor/dashboard/customerLeads' && (
                  <IconButton
                     className='delete_btn__hover'
                     sx={{
                        my: '1',
                     }}
                     size='small'
                     onClick={() => deleteUserHandler()}
                  >
                     <DeleteIcon sx={{ color: '#F20519' }} />
                  </IconButton>
               )}

               {role === 'Vendor' &&
                  location.pathname === '/vendor/dashboard/customerLeads' && (
                     <>
                        <PrimaryButton
                           onClick={() => setCustomerCreateDrawer(true)}
                           sx={{ px: 2, ml: 4 }}
                        >
                           New Customer
                        </PrimaryButton>

                        {customerCreateDrawer && (
                           <CreateCustomerDrawer
                              rightDrawerOpen={customerCreateDrawer}
                              setRightDrawerOpen={() =>
                                 setCustomerCreateDrawer(false)
                              }
                           />
                        )}
                     </>
                  )}
            </Box>
         </div>
      </Fragment>
   );
}
