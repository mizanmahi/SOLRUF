import axios from 'axios';
import { useEffect, useState } from 'react';

const usePinCode = (pinCode, defaultState, defaultDistrict) => {
   const [indiaState, setIndiaState] = useState(defaultState);
   const [district, setDistrict] = useState(defaultDistrict);

   useEffect(() => {
      if (pinCode) {
         const options = {
            method: 'POST',
            url: 'https://pincode.p.rapidapi.com/',
            headers: {
               'content-type': 'application/json',
               'x-rapidapi-host': 'pincode.p.rapidapi.com',
               'x-rapidapi-key':
                  '53d3e51015msh53a0f06a2fd9375p1c3484jsnd53c4f58cf42',
            },
            data: { searchBy: 'pincode', value: pinCode },
         };
         axios
            .request(options)
            .then(({ data }) => {
               console.log(data);
               setIndiaState(data[0].circle);
               console.log(data[0].circle);
               setDistrict(data[0].district);
               console.log(data);
            })
            .catch((error) => {
               console.log({ error });
            });
      }
   }, [pinCode]);

   return {
      indiaState,
      district,
      setIndiaState,
      setDistrict,
   };
};

export default usePinCode;
