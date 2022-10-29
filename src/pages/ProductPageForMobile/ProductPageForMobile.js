import { Dialog, IconButton } from '@mui/material';
import { Box, styled } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import SearchProduct from '../SearchProduct/SearchProduct';

import ProductListView from '../../components/ProductListView/ProductListView';

import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import { useState } from 'react';
import AnimatedSearchBar from '../../components/AnimatedSearchBar/AnimatedSearchBar';

const ProjectsPageBox = styled(Box)(({ theme }) => {
   return {
      padding: theme.spacing(0.5),
      paddingBottom: '1rem',
      borderRadius: theme.spacing(1),
      marginTop: theme.spacing(1),
      position: 'relative',
      width: '100%',
   };
});

const ProductPageForMobile = ({ setFetchProducts, products, }) => {
   const [showForm, setShowForm] = useState(false);
   const [searchProduct, setSearchProduct] = useState(false);

   const [showAnimatedSearchBar, setShowAnimatedSearchBar] = useState(false);
   const [searchValue, setSearchValue] = useState('');

   return (
      <ProjectsPageBox>
         <Box>
            {!showForm && !searchProduct && (
               <Box
                  sx={{
                     display: {
                        sm: 'none',
                        xs: 'flex',
                     },
                     width: '100%',
                     justifyContent: 'space-between',
                     mb: 3,
                  }}
               >
                  <AnimatedSearchBar
                     onChange={(e) => setSearchValue(e.target.value)}
                     searchTerm={searchValue}
                     showStatus={(status) => setShowAnimatedSearchBar(status)}
                  />
                  {!showAnimatedSearchBar && (
                     <IconButton
                        sx={{
                           bgcolor: 'primary.main',
                        }}
                        onClick={() => setSearchProduct(true)}
                     >
                        <AddIcon />
                     </IconButton>
                  )}
               </Box>
            )}

       
            {!showForm && !searchProduct && (
               <>
                  {products
                     ?.filter((el) =>
                        el.product_name.toLowerCase().includes(searchValue)
                     )
                     .map((product, index) => {
                        return (
                           <Box>
                              <ProductListView
                                 product={product}
                                 key={product.product_id}
                                 number={index + 1}
                                 setFetchProducts={setFetchProducts}
                              />
                           </Box>
                        );
                     })}
               </>
            )}
            {showForm && (
               <CustomizeProduct
                  setFetchProducts={setFetchProducts}
                  customizeProductPage={false}
                  searchProductPage={false}
               />
            )}

            <Dialog
               open={searchProduct}
               sx={{ top: '0' }}
               fullScreen
               hideBackdrop={true}
            >
               <SearchProduct
                  showProductPageHandler={() => setSearchProduct(false)}
                  searchProductPage={true}
                  customizeProductPage={false}
                  setFetchProducts={false}
                  mobileNextHandle={() => {
                     setShowForm(true);
                  }}
               />
            </Dialog>
         </Box>
      </ProjectsPageBox>
   );
};

export default ProductPageForMobile;
