import { useState } from 'react';
import { useEffect } from 'react';
import { axiAuth } from '../utils/axiosInstance';

const useCategories = (type, parentId) => {
   const [categories, setCategories] = useState([]);
   const [subCategories, setSubCategories] = useState([]);

   useEffect(() => {
      if (!parentId) {
         axiAuth
            .get(`api/categories?type=${type}`)
            .then((res) => {
               if (res.status === 200) {
                  console.log(res.data?.categories);
                  setCategories(res.data.categories);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      } else {
         axiAuth
            .get(`api/categories?parent=${parentId}`)
            .then((res) => {
               if (res.status === 200) {
                    console.log(res.data?.categories);
                  setSubCategories(res.data?.categories);
               }
            })
            .catch((err) => {
               console.log(err);
            });
      }
   }, [type, parentId]);

   return { categories, subCategories };
};

export default useCategories;
