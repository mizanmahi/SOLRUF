import { Container, MenuItem, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/styles';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import SearchBox from '../../../components/SearchBox/SearchBox';
import useCategories from '../../../hooks/useCategories';
import SolrufTextField from '../../../components/TextField/TextField';
import { axiAuth } from '../../../utils/axiosInstance';
import SingleProductForAdminPage from '../../../components/SingleProductForAdminPage/SingleProductForAdminPage';
import List from '@mui/material/List';
import Loader from '../../../components/Loader/Loader';
import SingleProduct from '../../../components/SingleProduct/SingleProduct';
import { toast } from 'react-toastify';

const ProductListWrapper = styled(Box)(({ theme }) => ({}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
}));

const SolrufTextFieldGray = styled(SolrufTextField)(({ theme }) => ({
   '& .MuiOutlinedInput-root': {
      // background: '#f3f3f3',
      '& fieldset': {
         borderColor: theme.palette.primary.main,
         borderWidth: '3px',
      },
      '&:hover fieldset': {
         borderWidth: '3px',
         borderColor: theme.palette.primary.main,
      },
      '&.Mui-focused fieldset': {
         borderWidth: '3px',
         borderColor: theme.palette.primary.main,
      },
   },
}));

const InfoBar = styled(Box)(({ theme }) => ({
   // borderBottom: `3px solid ${theme.palette.primary.main}`,
   padding: '.7rem',
   background: theme.palette.secondary.lightYellow,
   borderRadius: '5px',
}));

const ProductList = () => {
   const [searchTerm, setSearchTerm] = useState('');
   const searchTermChangeHandler = (e) => {
      setSearchTerm(e.target.value);
   };

   const { categories } = useCategories('product', null);
   const [subCategories, setSubCategories] = useState([]);

   const [selectedCategory, setSelectedCategory] = useState('');
   const [selectedSubCategory, setSelectedSubCategory] = useState('');

   useEffect(() => {
      if (selectedCategory) {
         axiAuth
            .get(`api/categories?parent=${selectedCategory}`)
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
   }, [selectedCategory]);

   const [products, setProducts] = useState([]);
   const [productsLoading, setProductLoading] = useState(true);
   const [productsError, setProductsError] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [selectedProductLoading, setSelectedProductLoading] = useState(false);
   const [page, setPage] = useState(1);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      setProductLoading(true);
      setProductsError(false);
      axiAuth
         .get(`api/admin/products?page=${page}`)
         .then((res) => {
            setProducts(res.data);
            setProductLoading(false);
            setProductsError(false);

            const pageNumber = Math.ceil(res.data.current_count / 15);
            setTotalPages(pageNumber);

            console.log('products', res.data);
         })
         .catch((err) => {
            console.log(err);
            setProductLoading(false);
            setProductsError('Error Fetching Products');
            console.log('first error', err.message);
         });
   }, [page]);

   console.log(products);

   const searchHandler = async (e) => {
      e.preventDefault();
      console.log('searching');
      try {
         if (!selectedCategory || !selectedSubCategory) {
            toast.warn('Please select category and sub category');
            return;
         }
         setProductLoading(true);

         const { data } = await axiAuth.get(
            `api/admin/products?page=${page}&sub_category_id=${selectedSubCategory}&search=${searchTerm}`
         );
         console.log(data);
         setProducts(data);
         setProductLoading(false);
      } catch (error) {
         setProductLoading(false);
         setProductsError('Error Fetching Products');
         console.log(error);
      }
   };

   if (productsError) {
      return <p>'Error Fetching Product'</p>;
   }

   return (
      <ProductListWrapper>
         <Container maxWidth='xl'>
            {/* ============ filter section ============ */}
            <Flex sx={{ my: 2 }}>
               <SolrufTextFieldGray
                  select
                  size='small'
                  label='Select Category'
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  sx={{ mr: 2 }}
               >
                  {categories.map(({ category_id, name }) => (
                     <MenuItem key={category_id} value={category_id}>
                        {name}
                     </MenuItem>
                  ))}
               </SolrufTextFieldGray>

               <SolrufTextFieldGray
                  select
                  size='small'
                  label='Select Category'
                  value={selectedSubCategory}
                  onChange={(e) => setSelectedSubCategory(e.target.value)}
               >
                  {subCategories.map(({ category_id, name }) => (
                     <MenuItem key={category_id} value={category_id}>
                        {name}
                     </MenuItem>
                  ))}
               </SolrufTextFieldGray>
            </Flex>

            <Box sx={{ my: 2 }}>
               <SearchBox
                  onChange={searchTermChangeHandler}
                  placeholder='Search Product'
                  searchTerm={searchTerm}
                  onSearch={searchHandler}
               />
            </Box>

            <InfoBar>
               <Flex sx={{ alignItems: 'center' }}>
                  <Typography>
                     <strong>Total Products: {products?.current_count}</strong>
                  </Typography>
               </Flex>
            </InfoBar>

            {/*  product list */}

            <List
               sx={{
                  width: '100%',
                  bgcolor: 'background.paper',
                  maxHeight: '366px !important',
                  overflowY: 'auto',
               }}
            >
               {productsLoading ? (
                  <Loader />
               ) : (
                  products?.products?.map((product, index) => (
                     <SingleProductForAdminPage
                        setSelectedProduct={setSelectedProduct}
                        key={product.product_id}
                        product={product}
                        setSelectedProductLoading={setSelectedProductLoading}
                     />
                  ))
               )}
            </List>

            {/* ============ pagination section ============ */}
            <Pagination
               count={totalPages}
               page={page}
               onChange={(e, page) => setPage(page)}
               color='primary'
               shape='rounded'
               sx={{ '& ul': { justifyContent: 'center' }, mt: 2 }}
            />

            {/* ============ details of single product section ============ */}
            {selectedProduct &&
               !selectedProductLoading && (
                  <Box
                     sx={{
                        width: '100%',
                        maxWidth: 'xl',
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'fixed',
                        bottom: 0,
                     }}
                  >
                     <SingleProduct product={selectedProduct} />
                  </Box>
               )}
         </Container>
      </ProductListWrapper>
   );
};

export default ProductList;
