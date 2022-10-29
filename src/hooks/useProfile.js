import { useEffect, useState } from 'react';
import { axiAuth } from '../utils/axiosInstance';

export const useProfile = () => {
   const [profile, setProfile] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchProfile = async () => {
         setLoading(true);
         try {
            const { status, data } = await axiAuth('/api/profile');
            if (status === 200) {
               setProfile(data.data);
               setLoading(false);
            }
         } catch (error) {
            setError(error.message);
            setLoading(false);
         }
      };

      fetchProfile();
   }, []);

   return { profile, loading, error };
};
