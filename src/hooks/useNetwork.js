import { useEffect, useState } from 'react';

export const useNetwork = () => {
   const [networkStatus, setNetworkStatus] = useState({
      online: navigator.onLine,
      from: new Date().toString(),
   });

   const handleOnline = () => {
      setNetworkStatus((prev) => ({
         ...prev,
         online: true,
         from: new Date().toString(),
      }));
   };
   const handleOffline = () => {
      setNetworkStatus((prev) => ({
         ...prev,
         online: false,
         from: new Date().toString(),
      }));
   };

   useEffect(() => {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
         window.removeEventListener('online', handleOnline);
         window.removeEventListener('offline', handleOffline);
      };
   }, []);

   return {
      networkStatus,
   };
};
