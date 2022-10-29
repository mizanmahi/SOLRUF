import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LeftProductFilter from '../../components/LeftProductFilter/LeftProductFilter';
import ProductCardForPortfolio from './ProductCardForPortfolio';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import SolrufModal from '../../components/Custom/SolrufModal/SolrufModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

// import { axiAuth } from '../../utils/axiosInstance';

const categories = [
   'Solar Panel',
   'Solar roofing',
   'Solar invertors',
   'Solar water pipes',
   'Solar water tanks',
   'Solar water heater',
];

var sortCategories = {
   'Power Capacity': false,
   'Price Range': false,
};

const BookProducts = ({
   products,
   scrollIntoView = true,
   setShowProducts,
   openPurchaseModal,
   closePurchaseModal,
   vendorSlug,
   setProducts,
}) => {
   const productsRef = useRef(null);
   // const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));

   // useEffect(() => {
   //    if (scrollIntoView) {
   //       setTimeout(() => {
   //          productsRef.current.scrollIntoView({ behavior: 'smooth' });
   //       }, 1000);
   //    }
   // }, [scrollIntoView]);

   console.log({ vendorSlug });

   const [activeCategory, setActiveCategory] = useState('');
   const [filterCategory, setFilterCategory] = useState(sortCategories);

   const handleActiveCategory = (category) => {
      setActiveCategory(category);
   };

   const [displayProducts, setDisplayProducts] = useState(products);
   console.log(displayProducts);

   useEffect(() => {
      if (activeCategory) {
         setDisplayProducts(() => {
            return products.filter((product) => {
               console.log({
                  product: product.main_category.name,
                  activeCategory: activeCategory,
               });
               return product.main_category.name === activeCategory;
            });
         });
      } else {
         setDisplayProducts(products);
      }
   }, [activeCategory, products]);

   const props = {
      activeCategory,
      setActiveCategory,
      filterSort: filterCategory,
      setFilterSort: setFilterCategory,
      handleActiveCategory,
      categories,
      sortCategories,
   };
   const [showFilterModal, setShowFilterModal] = useState(false);

   return (
      <motion.div
         initial={{ x: '100vw', opacity: 0 }}
         animate={{ x: 0, opacity: 1 }}
         transition={{ duration: 1, delay: 0.1 }}
      >
         <Box sx={{ mt: 2, mb: 5 }} ref={productsRef}>
            <Grid container spacing={3}>
               <Grid item xs={12} md={4} lg={3}>
                  <Box sx={{ display: ['none', 'block'] }}>
                     <LeftProductFilter {...props} />
                  </Box>

                  <Box
                     sx={{
                        display: ['flex', 'none'],
                        width: '100%',
                        justifyContent: 'center',
                     }}
                  >
                     <PrimaryButton
                        sx={{ mx: 'auto', py: 1.5, px: 2 }}
                        IconEnd={FilterAltIcon}
                        onClick={() => setShowFilterModal(true)}
                     >
                        Filter Products By Category
                     </PrimaryButton>
                  </Box>

                  <SolrufModal
                     open={showFilterModal}
                     onClose={() => setShowFilterModal(false)}
                  >
                     <LeftProductFilter {...props} sx={{my: 3}} />
                  </SolrufModal>
               </Grid>

               <Grid
                  item
                  container
                  spacing={2}
                  xs={12}
                  md={8}
                  lg={9}
                  rowSpacing={3}
               >
                  {displayProducts?.length > 0 &&
                     displayProducts?.map((product, i) => (
                        <Grid item xs={12} md={6} lg={4}>
                           <ProductCardForPortfolio
                              openPurchaseModal={openPurchaseModal}
                              closePurchaseModal={closePurchaseModal}
                              product={product}
                              actionType='purchase'
                              sx={{ mx: 'auto' }}
                              vendorSlug={vendorSlug}
                           />
                        </Grid>
                     ))}
               </Grid>
            </Grid>

            {/* <CustomBottomBar sx={{
               position: 'fixed',
               bottom: 0,
            }}>
               <PrimaryButton >
                  Filter
               </PrimaryButton>
            </CustomBottomBar> */}
         </Box>
      </motion.div>
   );
};

export default BookProducts;
