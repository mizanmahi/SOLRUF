import { useState } from 'react';
import { axiAuth } from '../utils/axiosInstance';

const useVerifyGst = () => {
   const [gstVerified, setGstVerified] = useState(false);
   const [gstVerifying, setGstVerifying] = useState(false);
   const [gstError, setGstError] = useState('');

   const verifyGst = async (gst) => {
      console.log(gst);
      setGstVerifying(true);
      // return;
      try {
         const response = await axiAuth.post(`api/vendor/verify-gst`, {
            gstin: gst,
         });

         if (response.status === 200) {
            console.log(response.data);
            setGstVerified(response.data?.company_name);
            setGstVerifying(false);
            setGstError('');
         }
      } catch (error) {
         setGstVerified(false);
         setGstVerifying(false);
         setGstError('Invalid Gst');
      }
   };

   return {
      gstError,
      setGstError,
      gstVerified,
      verifyGst,
      gstVerifying,
   };
};

export default useVerifyGst;
