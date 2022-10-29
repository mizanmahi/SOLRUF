import {
   Button,
   Container,
   Grid,
   List,
   Pagination,
   Typography,
} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Box } from '@mui/system';
import CustomizeProduct from '../CustomizeProduct/CustomizeProduct';
import { motion } from 'framer-motion';
import useCategories from '../../hooks/useCategories';
import { useForm } from 'react-hook-form';
import { axiAuth } from '../../utils/axiosInstance';
import Loader from '../../components/Loader/Loader';
import SingleProductForAdminPage from '../../components/SingleProductForAdminPage/SingleProductForAdminPage';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import DynamicRangeFilter from '../../components/Custom/RangeFilter/DynamicRangeFilter';
import DynamicGardenSelect from '../../components/Custom/GardenSelectWithChip/DynamicGardenSelect';
import HorizontalProductCard from '../../components/HorizontalProductCard/HorizontalProductCard';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import {
   FilterArea,
   Nav,
   NoResultBox,
   ProductArea,
   SearchArea,
   SearchProductWrapper,
} from './searchProduct.style';
import SecondarySearchBar from '../../components/SecondarySearch/SecondarySearchBar';
import { useDebounce } from 'use-debounce';
import FullScreenDialog from '../../components/Custom/BottomDialog/BottomDialog';
import BottomSheet from '../../components/Custom/BottomDialog/PortfolioBottomSheet';
import ProductSlider from '../../components/ProductSlider/ProductSlider';
import styled from 'styled-components';
import ProductDetailList from '../../components/ProductDetailList/ProductDetailList';
import RoundedDarkButton from '../../components/RoundedDarkButton/RoundedDarkButton';

const ImageBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1.5rem',
      marginBottom: '1.5rem',
   };
});

const SearchProduct = ({
   showProductPageHandler,
   nextHandler,
   searchProductPage,
   customizeProductPage,
   setFetchProducts,
   mobileNextHandle,
}) => {
   const { register, watch } = useForm();

   console.log('search product rendered');

   const { categories } = useCategories('product');
   const [watchCategoryId, watchSubCategoryId] = watch([
      'category',
      'subCategory',
   ]);

   const { subCategories } = useCategories('product', watchCategoryId);

   const [searchTerm, setSearchTerm] = useState('');
   const [debouncedSearchTerm] = useDebounce(searchTerm, 1000);
   const [productList, setProductList] = useState([]);
   const [productListLoading, setProductListLoading] = useState(false);
   const [productListError, setProductListError] = useState(false);
   const [selectedProduct, setSelectedProduct] = useState(null);
   const [selectedProductLoading, setSelectedProductLoading] = useState(false);

   const [page, setPage] = useState(1);
   const [paginationInfo, setPaginationInfo] = useState({});
   const [showMobileEdit, setShowMobileEdit] = useState(false);
   const [showMobileFilter, setShowMobileFilter] = useState(false);

   console.log({ paginationInfo });

   const searchHandler = () => {
      console.log('searching...');
      console.log(searchTerm);

      if (!watchCategoryId || !watchSubCategoryId) {
         toast.warn('Please select a category and sub category');
         return;
      }

      if (!searchTerm) {
         toast.warn('Please enter a search term on the search box');
         return;
      }

      setProductListLoading(true);
      setProductListError(false);
      axiAuth
         .post(`api/products?length=15&page=1`, {
            search: searchTerm.replace(/  +/g, ' ').trim(),
            category_id: watchSubCategoryId || '',
            attributes: [
               ...selectFilters
                  .filter((filter) => filter.selectedItems.length > 0)
                  .map((filter) => ({
                     id: filter.id,
                     type: 'select',
                     value: [...filter.selectedItems],
                  })),
               ...rangeFilters
                  .filter((filter) => filter.isValid)
                  .map((filter) => ({
                     id: filter.id,
                     type: 'range',
                     min: filter.from,
                     max: filter.to,
                  })),
            ],
         })
         .then((res) => {
            setProductList(res.data.products);
            setPaginationInfo(res.data.pagination);
            setProductListLoading(false);
            setProductListError('');
         })
         .catch((error) => {
            setProductListError('Error Fetching Product, Try again!');
            setProductListLoading(false);
         });
   };

   const { selectedProductByVendor } = useSelector(
      (state) => state.vendorProductList
   );

   const nextClickHandler = () => {
      if (!selectedProductByVendor) {
         toast.warn('Please select a product');
         return;
      }
      nextHandler(1);
   };

   const [selectFilters, setSelectFilters] = useState([
      {
         id: 0,
         selectedItems: [],
         items: [],
         name: '',
      },
   ]);

   const [rangeFilters, setSetRangeFilters] = useState([
      {
         from: 0,
         to: 0,
         min: 0,
         max: 0,
         isValid: false,
         id: 0,
      },
   ]);

   // for setting the dynamic filters in the state
   useEffect(() => {
      setSelectFilters([]);
      setSetRangeFilters([]);
      setPage(1);
      if (watchSubCategoryId) {
         axiAuth
            .get('api/filters?sub_category_id=' + watchSubCategoryId)
            .then((res) => {
               setSelectFilters(
                  res.data.filters
                     .filter((filter) => filter.filter_type === 'select')
                     .map((filter) => {
                        return {
                           id: filter.id,
                           selectedItems: [],
                           items: filter.filter_select,
                           name: filter.name,
                        };
                     })
               );
               setSetRangeFilters(
                  res.data.filters
                     .filter((filter) => filter.filter_type === 'range')
                     .map((filter) => {
                        return {
                           from: 0,
                           to: 0,
                           min: filter.filter_range.min,
                           max: filter.filter_range.max,
                           isValid: false,
                           name: filter.name,
                           id: filter.id,
                        };
                     })
               );
            })

            .catch((err) => {
               console.log(err);
            });
      }
   }, [watchSubCategoryId]);

   useEffect(() => {
      setProductListError('');

      if (!watchCategoryId || !watchSubCategoryId) return;

      if (selectFilters.length === 0 && rangeFilters.length === 0) return;

      setProductListLoading(true);

      axiAuth
         .post(`api/products?length=3&page=${page}`, {
            search: debouncedSearchTerm.replace(/  +/g, ' ').trim() || '',
            category_id: watchSubCategoryId || '',
            attributes: [
               ...selectFilters
                  .filter((filter) => filter.selectedItems.length > 0)
                  .map((filter) => ({
                     id: filter.id,
                     type: 'select',
                     value: [...filter.selectedItems],
                  })),
               ...rangeFilters
                  .filter((filter) => filter.isValid)
                  .map((filter) => ({
                     id: filter.id,
                     type: 'range',
                     min: filter.from,
                     max: filter.to,
                  })),
            ],
         })
         .then((res) => {
            console.log('comes here');
            setProductList(res.data.products);
            setPaginationInfo(res.data.pagination);
            setProductListError('');
         })
         .catch((err) => {
            setProductListError('Error Fetching Product, Try again!');
            console.log(err);
         })
         .finally(() => {
            setProductListLoading(false);
         });
   }, [
      watchSubCategoryId,
      selectFilters,
      rangeFilters,
      debouncedSearchTerm,
      watchCategoryId,
      page,
   ]);

   console.log(productListLoading);

   if (productListError) {
      return <Typography>{productListError}</Typography>;
   }

   return (
      <Fragment>
         <motion.div
            initial={{ x: '10vw', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
         >
            {searchProductPage && (
               <SearchProductWrapper>
                  <Container maxWidth='xl'>
                     <Nav>
                        <Button
                           startIcon={<ArrowBackIcon />}
                           sx={{ color: '#4D4D4D' }}
                           onClick={showProductPageHandler}
                        >
                           Back To Products
                        </Button>
                     </Nav>
                     <Typography>
                        Note: Already added product to your portfolio will be
                        overridden!
                     </Typography>
                     <SearchArea>
                        <Grid container spacing={3}>
                           <Grid item xs={12} md={6}>
                              <Box sx={{ minWidth: 120 }}>
                                 <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-label'>
                                       Select category
                                    </InputLabel>
                                    <Select
                                       // size='small'
                                       labelId='demo-simple-select-label'
                                       label='Select category'
                                       sx={{ background: '#fff' }}
                                       {...register('category', {
                                          required: {
                                             value: true,
                                             message: 'Select Category',
                                          },
                                       })}
                                       defaultValue=''
                                    >
                                       {categories.length > 0 &&
                                          categories.map(
                                             ({ category_id, name }) => (
                                                <MenuItem
                                                   value={category_id}
                                                   key={category_id}
                                                >
                                                   {name}
                                                </MenuItem>
                                             )
                                          )}
                                    </Select>
                                 </FormControl>
                              </Box>
                           </Grid>
                           <Grid item xs={12} md={6}>
                              <Box sx={{ minWidth: 120 }}>
                                 <FormControl fullWidth>
                                    <InputLabel id='demo-simple-select-label'>
                                       Select Subcategory
                                    </InputLabel>
                                    <Select
                                       // size='small'
                                       labelId='demo-simple-select-label'
                                       // value={category}
                                       // onChange={handleChange}
                                       disabled={!watchCategoryId}
                                       label='Select Subcategory'
                                       sx={{ background: '#fff' }}
                                       {...register('subCategory', {
                                          required: {
                                             value: true,
                                             message: 'Select Sub Category',
                                          },
                                       })}
                                       defaultValue={''}
                                    >
                                       {subCategories.length > 0 &&
                                          subCategories.map(
                                             ({ category_id, name }) => (
                                                <MenuItem
                                                   value={category_id}
                                                   key={category_id}
                                                >
                                                   {name}
                                                </MenuItem>
                                             )
                                          )}
                                    </Select>
                                 </FormControl>
                              </Box>
                           </Grid>
                           <Grid item xs={12}>
                              {watchCategoryId && watchSubCategoryId && (
                                 <SecondarySearchBar
                                    sx={{
                                       mr: 0,
                                       '& input': { fontWeight: 400 },
                                    }}
                                    placeHolder='Search Products'
                                    searchTerm={searchTerm}
                                    onChangeVal={(e) =>
                                       setSearchTerm(e.target.value)
                                    }
                                    onSearch={searchHandler}
                                 />
                              )}
                           </Grid>
                        </Grid>
                     </SearchArea>

                     {/* ================== content area ================== */}

                     {watchCategoryId === 73 && (
                        <Box
                           sx={{
                              width: '100%',
                              height: '100%',
                              minHeight: '40vh',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                           }}
                        >
                           <Typography
                              sx={{
                                 fontSize: '2rem',
                                 color: 'rgba(0,0,0,0.3)',
                              }}
                           >
                              No Product Found
                           </Typography>
                        </Box>
                     )}

                     {watchCategoryId !== 73 && (
                        <Grid container spacing={2} sx={{ mt: 1 }}>
                           {watchCategoryId && watchSubCategoryId && (
                              <>
                                 <Grid
                                    item
                                    xs={12}
                                    md={12}
                                    lg={4}
                                    sx={{
                                       display: { xs: 'none', sm: 'block' },
                                    }}
                                 >
                                    {productList.length > 0 && (
                                       <FilterArea>
                                          <Typography
                                             variant='body2'
                                             color='gray'
                                          >
                                             Filter Items
                                          </Typography>

                                          {selectFilters.length > 0 &&
                                             selectFilters.map((filter, i) => (
                                                <Box sx={{ my: 3 }} key={i}>
                                                   <DynamicGardenSelect
                                                      selectFilters={
                                                         selectFilters
                                                      }
                                                      setSelectFilters={
                                                         setSelectFilters
                                                      }
                                                      id={selectFilters[i].id}
                                                      name={
                                                         selectFilters[i].name
                                                      }
                                                   />
                                                </Box>
                                             ))}

                                          {/* ====== filter by type ====== */}
                                          {rangeFilters.length > 0 &&
                                             rangeFilters.map((filter, i) => (
                                                <DynamicRangeFilter
                                                   key={i}
                                                   id={rangeFilters[i].id}
                                                   sx={{ my: 3 }}
                                                   rangeFilters={rangeFilters}
                                                   setSetRangeFilters={
                                                      setSetRangeFilters
                                                   }
                                                   name={rangeFilters[i].name}
                                                />
                                             ))}
                                       </FilterArea>
                                    )}
                                 </Grid>

                                 {productList.length === 0 &&
                                 !productListLoading ? (
                                    <NoResultBox>
                                       <Typography>
                                          {watchCategoryId === 73
                                             ? 'No Products Found'
                                             : 'No Search Result'}
                                       </Typography>
                                    </NoResultBox>
                                 ) : (
                                    <Grid item xs={12} md={12} lg={8}>
                                       <ProductArea
                                          sx={{ height: ['auto', 580], pr: 2 }}
                                       >
                                          {productList?.length > 0 && (
                                             <Typography
                                                variant='body1'
                                                sx={{
                                                   mb: 1,
                                                   fontWeight: 'bold',
                                                }}
                                             >
                                                Total ({productList?.length}{' '}
                                                Results)
                                             </Typography>
                                          )}

                                          {/* ============================== product list ============================== */}

                                          {productListLoading && <Loader />}

                                          <List
                                             sx={{
                                                width: '100%',
                                             }}
                                          >
                                             {productList.length > 0 &&
                                             !productListLoading
                                                ? productList.map((product) => (
                                                     <SingleProductForAdminPage
                                                        isVendor={true}
                                                        editable={false}
                                                        key={product.product_id}
                                                        product={product}
                                                        setSelectedProduct={
                                                           setSelectedProduct
                                                        }
                                                        selectedProduct={
                                                           selectedProduct
                                                        }
                                                        setSelectedProductLoading={
                                                           setSelectedProductLoading
                                                        }
                                                     />
                                                  ))
                                                : null}
                                          </List>
                                       </ProductArea>
                                       {productList.length > 0 && (
                                          <Pagination
                                             count={paginationInfo.last_page}
                                             page={page}
                                             onChange={(e, page) =>
                                                setPage(page)
                                             }
                                             color='primary'
                                             shape='circle'
                                             sx={{
                                                '& ul': {
                                                   justifyContent: 'center',
                                                },
                                                mt: 2,
                                             }}
                                          />
                                       )}
                                    </Grid>
                                 )}
                              </>
                           )}

                           <BottomSheet
                              open={
                                 watchCategoryId &&
                                 watchSubCategoryId &&
                                 window.innerWidth < 600 &&
                                 showMobileFilter
                              }
                              handleClose={() => {
                                 setShowMobileFilter(false);
                              }}
                              height='100%'
                              backText='Filters'
                           >
                              <FilterArea>
                                 <Typography variant='body2' color='gray'>
                                    Items
                                 </Typography>

                                 {selectFilters.length > 0 &&
                                    selectFilters.map((filter, i) => (
                                       <Box sx={{ my: 3 }} key={i}>
                                          <DynamicGardenSelect
                                             selectFilters={selectFilters}
                                             setSelectFilters={setSelectFilters}
                                             id={selectFilters[i].id}
                                             name={selectFilters[i].name}
                                          />
                                       </Box>
                                    ))}

                                 {/* ====== filter by type ====== */}
                                 {rangeFilters.length > 0 &&
                                    rangeFilters.map((filter, i) => (
                                       <DynamicRangeFilter
                                          key={i}
                                          id={rangeFilters[i].id}
                                          sx={{ my: 3 }}
                                          rangeFilters={rangeFilters}
                                          setSetRangeFilters={
                                             setSetRangeFilters
                                          }
                                          name={rangeFilters[i].name}
                                       />
                                    ))}
                              </FilterArea>
                           </BottomSheet>
                        </Grid>
                     )}

                     {selectedProduct && (
                        <Fragment>
                           <Box
                              sx={{
                                 margin: '4rem auto',
                                 display: { xs: 'none', sm: 'flex' },
                                 justifyContent: 'center',
                              }}
                           >
                              {selectedProductLoading ? (
                                 <Loader />
                              ) : (
                                 <HorizontalProductCard
                                    product={selectedProduct}
                                    type='procurement'
                                 />
                              )}
                           </Box>
                           <Box
                              sx={{
                                 display: { xs: 'block', sm: 'none' },
                              }}
                           >
                              <FullScreenDialog
                                 sx={{
                                    display: { xs: 'block', sm: 'none' },
                                 }}
                                 height='70%'
                                 bar={true}
                                 handleClose={() => {
                                    setSelectedProduct(null);
                                 }}
                                 open={
                                    selectedProduct && window.innerWidth < 600
                                 }
                              >
                                 <Box sx={{ pb: 5 }}>
                                    <Typography
                                       sx={{ fontWeight: 'bold', mb: 1.5 }}
                                    >
                                       {' '}
                                       {selectedProduct.product_name}{' '}
                                    </Typography>
                                    <ImageBox>
                                       <ProductSlider
                                          images={selectedProduct.images.map(
                                             (item) => {
                                                return item.image_url;
                                             }
                                          )}
                                          view='mobile'
                                       />
                                    </ImageBox>

                                    {selectedProduct.attributes?.map(
                                       (attribute) => (
                                          <ProductDetailList
                                             list={`${attribute.name}`}
                                             description='Rs 256/sq.ft.'
                                          />
                                       )
                                    )}

                                    <RoundedDarkButton
                                       title=' See Detailed Product Description'
                                       style={{
                                          width: '100%',
                                          marginTop: '1rem',
                                       }}
                                    />
                                 </Box>
                                 <PrimaryButton
                                    IconEnd={ArrowForwardIcon}
                                    onClick={() => setShowMobileEdit(true)}
                                    sx={{
                                       position: 'fixed',
                                       bottom: '0',
                                       width: '100%',
                                       left: '0',
                                       py: 1,
                                    }}
                                 >
                                    Next
                                 </PrimaryButton>
                              </FullScreenDialog>
                           </Box>
                        </Fragment>
                     )}
                     <Box
                        sx={{
                           display: { xs: 'none', sm: 'flex' },
                           justifyContent: 'center',
                           pt: 3,
                        }}
                     >
                        <PrimaryButton
                           IconEnd={ArrowForwardIcon}
                           sx={{ px: 8, py: 1, mb: 2 }}
                           onClick={nextClickHandler}
                        >
                           Next
                        </PrimaryButton>
                     </Box>
                  </Container>
               </SearchProductWrapper>
            )}

            {/* ======= customize product ====== */}
            {customizeProductPage && (
               <CustomizeProduct
                  setFetchProducts={setFetchProducts}
                  nextHandler={nextHandler}
                  showProductPageHandler={showProductPageHandler}
               />
            )}

            <BottomSheet
               open={showMobileEdit}
               handleClose={() => setShowMobileEdit(false)}
               height='100%'
               backText='Back to Product Search'
            >
               <CustomizeProduct
                  setFetchProducts={setFetchProducts}
                  nextHandler={nextHandler}
                  showProductPageHandler={() => setShowMobileEdit(false)}
               />
            </BottomSheet>
         </motion.div>
         {watchCategoryId && (
            <PrimaryButton
               onClick={() => setShowMobileFilter(true)}
               sx={{
                  position: 'fixed',
                  bottom: '0',
                  width: '100%',
                  left: '0',
                  display: {
                     xs: 'flex',
                     sm: 'none',
                  },
                  py: 1.5,
               }}
            >
               Filters
            </PrimaryButton>
         )}
      </Fragment>
   );
};

export default React.memo(SearchProduct);
