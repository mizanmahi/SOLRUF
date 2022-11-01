import { useEffect, useState } from 'react';
import { axiAuth } from '../utils/axiosInstance';

const useProduct = (vendorSlug, productSlug) => {
   const [product, setProduct] = useState({});
   const [productLoading, setProductLoading] = useState(true);
   const [productError, setProductError] = useState('');

   useEffect(() => {
      const fetchProduct = async () => {
         setProductLoading(true);
         if (!vendorSlug || !productSlug) return;
         setProductError('');
         try {
            const { status, data } = await axiAuth(
               `api/vendor/v2/${vendorSlug}/products/${productSlug}`
            );
            if (status === 200) {
               setProduct(data);
               setProductError('');
               setProductLoading(false);
            }
         } catch (error) {
            setProductLoading(false);
            setProductError('Product not found');
         }
      };

      fetchProduct();
   }, [vendorSlug, productSlug]);

   return {
      product,
      productLoading,
      productError,
      setProduct,
      setProductLoading,
      setProductError,
   };
};

export default useProduct;
