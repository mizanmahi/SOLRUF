import React, { Fragment, useEffect, useState } from 'react';
import GlobalTable from '../../../components/MyTables/GlobalTable';
import GlobalMobileTable from '../../../components/MyTables/GlobalMobileTable';
import { axiAuth } from '../../../utils/axiosInstance';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setConsultationsData } from '../../../redux/slices/tableSlice';
import { formateToSqlDateWithMoment } from '../../../utils/formateToSqlDateTime';

const consultationColumns = [
   {
      Header: 'ID',
      accessor: 'id',
   },
   {
      Header: 'name',
      accessor: 'name',
   },
   {
      Header: 'Email',
      accessor: 'email',
   },
   {
      Header: 'Phone',
      accessor: 'mobile',
   },
   {
      Header: 'Location',
      accessor: 'address',
   },
   {
      Header: 'Time',
      accessor: 'created_at',
   },
   {
      Header: 'Type',
      accessor: 'type',
   },
];

function ConsultationTable({ searchTerm, filters }) {
   const dispatch = useDispatch();
   const [consultations, setConsultations] = useState([]);
   // const [loading, setLoading] = useState(true);
   const [consultationError, setConsultationError] = useState('');

   console.log(consultations);

   const { consultationsData } = useSelector((state) => state.tableData);

   useEffect(() => {
      setConsultations(consultationsData);
   }, [consultationsData]);

   const consultationDataWithPagination = async (
      pageIndex,
      searchTerm,
      filters
   ) => {
      let url = `api/vendor/booking-consultations?page=${
         pageIndex + 1
      }&length=${2}`;

      if (searchTerm) {
         url += `&search=${searchTerm}`;
      }

      const { from_date, to_date } = filters.date;

      if (from_date && to_date) {
         const fromDate = formateToSqlDateWithMoment(from_date).split(' ')[0];
         const toDate = formateToSqlDateWithMoment(to_date).split(' ')[0];
         url += `&from_date=${fromDate}&to_date=${toDate}`;
      }

      if (filters.state) {
         url += `&state=${filters.state}`;
      }

      // setLoading(true);
      try {
         setConsultationError('');
         const fetchData = await axiAuth.get(url);
         const csData = fetchData.data.consultations;
         console.log('consultationDataWithPagination', csData);
         setConsultations(csData);
         dispatch(setConsultationsData(csData));
         const pages = fetchData.data.pagination.last_page;
         // setLoading(false);
         return { csData, pages };
      } catch (error) {
         console.log(error);
         setConsultationError(error.message);
         // setLoading(false);
         return { csData: [], pages: 0 };
      }
   };

   console.log(consultations);

   // if (loading) {
   //    return <BackdropLoader />;
   // }

   return (
      <Fragment>
         <>
            {consultationError && (
               <Typography>Error Fetching Consultations</Typography>
            )}

            <>
               <GlobalMobileTable
                  // setPagination={consultationDataWithPagination}
                  columns={consultationColumns}
                  data={consultations}
               />
               {consultations?.constructor === Array &&
                  consultations?.length >= 0 && (
                     <GlobalTable
                        columns={consultationColumns}
                        data={consultations}
                        setPagination={consultationDataWithPagination}
                        basic
                        searchTerm={searchTerm}
                        filters={filters}
                     />
                  )}
            </>
         </>
      </Fragment>
   );
}

export default ConsultationTable;
