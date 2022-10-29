import { useEffect, useState } from 'react';
import { axiAuth } from '../utils/axiosInstance';

export const useCompanyDetails = () => {
   const [companyDetails, setCompanyDetails] = useState({});
   const [companyDetailsLoading, setCompanyDetailsLoading] = useState(true);
   const [companyDetailsError, setCompanyDetailsError] = useState(false);

   useEffect(() => {
      setCompanyDetailsLoading(true);
      setCompanyDetailsError('');
      const fetchCompanyDetails = async () => {
         try {
            const { data } = await axiAuth.get('api/profile');
            if (data.data.business) {
               setCompanyDetails(data.data.business);
            } else {
               setCompanyDetailsError(
                  'Please create your basic business profile for generating proforma invoice.'
               );
            }
            setCompanyDetailsLoading(false);
         } catch (error) {
            setCompanyDetailsError('');
            setCompanyDetailsLoading(false);
         }
      };

      fetchCompanyDetails();
   }, []);

   return {
      companyDetails,
      companyDetailsLoading,
      companyDetailsError,
   };
};
