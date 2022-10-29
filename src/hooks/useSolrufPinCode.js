import { useEffect, useState } from 'react';
import { axiAuth } from '../utils/axiosInstance';

const useSolrufPinCode = (pinCode, defaultState, defaultDistrict) => {
   const [indiaState, setIndiaState] = useState(defaultState);
   const [district, setDistrict] = useState(defaultDistrict);
   const [pinCodeError, setPinCodeError] = useState(false);

   useEffect(() => {
      setPinCodeError(false);
      if (pinCode) {
         axiAuth
            .get(`api/pin-code/search?pin_code=${pinCode}`)
            .then(({ data }) => {
               setIndiaState(data.pin_code.state);
               setDistrict(data.pin_code.district);
            })
            .catch((err) => {
               setPinCodeError(true);
               console.log(err);
            });
      }
   }, [pinCode]);

   return {
      indiaState,
      district,
      setIndiaState,
      setDistrict,
      pinCodeError,
   };
};

export default useSolrufPinCode;
