import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Button, Pagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

import AddProject from '../AddProject/AddProject';
import SearchProduct from '../SearchProduct/SearchProduct';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router';
import { axiAuth } from '../../utils/axiosInstance';
import { useDispatch, useSelector } from 'react-redux';
import {
   removeProjectToBeEdited,
   setProjects,
} from '../../redux/slices/projectSlice';
import ProjectsPageForMobile from '../ProjectsPageForMobile/ProjectsPageForMobile';
import ProductPageForMobile from '../ProductPageForMobile/ProductPageForMobile';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import ProjectCard from '../../components/Custom/ProjectCard/ProjectCard';
import {
   setProductData,
   setProductsLoading,
} from '../../redux/slices/productSlice';
import VendorProductCard from '../../components/VendorProductCard/VendorProductCard';

import TabBtn from '../../components/SmallTab/TabBtn';

const HeaderBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.2rem',
   };
});

const ProjectsBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1.5rem',
      padding: '0 1.5rem',
      '@media (max-width: 600px)': {
         padding: '0.5rem',
      },
   };
});

const ProjectsPageBox = styled(Box)(({ theme }) => {
   return {
      // padding: theme.spacing(0.5),
      // border: `2px solid ${theme.palette.primary.main}`,
      borderRadius: '0 12px 12px 12px',
      marginTop: theme.spacing(10),
      position: 'relative',
      paddingTop: '1rem',
      paddingBottom: '1rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0)',
   };
});

const TopButtonBox = styled(Box)(({ theme }) => {
   return {
      display: 'flex',
      position: 'absolute',
      bottom: '100%',
   };
});

const UploadProjectBox = styled(Box)(({ theme }) => {
   return {
      // border: `2px solid ${theme.palette.primary.main}`,
      background: '#fff',
      // width: '320px',
      maxWidth: '100%',
      // minWidth: '330px',
      height: '100%',
      borderRadius: '10px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      padding: '1rem',
   };
});

const ProjectsPage = ({ vendorSlug }) => {
   // const [projects, setProjects] = useState([]);
   const [projectPage, setProjectPage] = useState(true);
   const [showForm, setShowForm] = useState(false);
   const [showProductForm, setShowProductForm] = useState(false);
   const matches = useMediaQuery((theme) => theme.breakpoints.down('sm'));
   const navigate = useNavigate();

   const dispatch = useDispatch();
   const { projects } = useSelector((state) => state.project);

   const [projectsPages, setProjectsPages] = useState(1);
   const [productsPages, setProductsPages] = useState(1);

   const [projectPaginationInfo, setProjectPaginationInfo] = useState({});
   const [productPaginationInfo, setProductPaginationInfo] = useState({});

   const showFormHandler = () => {
      if (matches) {
         navigate('/m.addProject');
      }

      if (projectPage) {
         setShowForm(true);
         // setProjectPage(false);
      } else {
         nextHandler(2);
         setShowProductForm(true);
      }
   };

   const showProjectsPageHandler = useCallback(() => {
      setProjectPage(true);
      setShowForm(false);
      setShowProductForm(false);
   }, []);

   const showProductPageHandler = useCallback(() => {
      Error('Something went Wrong');
      // handleError(err);
      setProjectPage(false);
      setShowForm(false);
      setShowProductForm(false);
   }, []);

   const [fetchProjects, setFetchProjects] = useState(true);

   // fetching projects
   useEffect(() => {
      axiAuth
         .get(`api/vendor/projects?page=${projectsPages}&length=10`)
         .then(({ data }) => {
            dispatch(setProjects(data.projects));
            setProjectPaginationInfo(data.pagination);
         })
         .catch((err) => {
            console.log(err);
         });
   }, [showForm, fetchProjects, dispatch, projectsPages]);

   const backToProjectHandler = () => {
      setShowForm(false);
      dispatch(removeProjectToBeEdited());
   };

   const product = useSelector((state) => state.product);

   const [fetchProducts, setFetchProducts] = useState(false);
   // const [searchValue, setSearchValue] = useState("");
   // fetching products
   useEffect(() => {
      console.log('fetching products');
      dispatch(setProductsLoading(true));
      axiAuth(`api/vendor/products?page=${productsPages}&length=5`)
         .then(({ data }) => {
            console.log(data);
            dispatch(setProductData(data));
            setProductPaginationInfo(data.pagination);
            dispatch(setProductsLoading(false));
         })
         .catch((err) => {
            console.log(err);
         });
   }, [fetchProducts, dispatch, productsPages]);

   const [searchProductPage, setSearchProductPage] = useState(true);
   const [customizeProductPage, setCustomizeProductPage] = useState(false);

   const nextHandler = useCallback((pageNumber) => {
      if (pageNumber === 1) {
         console.log('comes in next handler');
         setSearchProductPage(false);
         setCustomizeProductPage(true);
      } else if (pageNumber === 2) {
         setSearchProductPage(true);
         setCustomizeProductPage(false);
      }
   }, []);

   const [currentTab, setCurrentTab] = useState('Projects');

   const onTabChange = () => {
      setCurrentTab(currentTab === 'Projects' ? 'Products' : 'Projects');
      if (currentTab === 'Projects') {
         showProductPageHandler();
      } else {
         showProjectsPageHandler();
      }
   };

   return (
      <ProjectsPageBox
         sx={{
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
         }}
      >
         <TabBtn
            tabChange={onTabChange}
            tabName={['Projects', 'Products']}
            sx={{
               display: {
                  sx: 'bock',
                  sm: 'none',
               },
            }}
         />

         <TopButtonBox sx={{ display: { sm: 'flex', xs: 'none' } }}>
            <PrimaryButton
               style={{
                  marginRight: '1rem',
                  width: '150px',
                  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0)',
                  backgroundColor: `${projectPage ? '#ffd05b' : '#fff'}`,
                  borderBottom: 'none',
                  borderRadius: '14px 14px 0 0',
                  padding: '12px 32px',
                  color: '#4d4d4d',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  fontWeight: projectPage ? 800 : 400,
                  '&:hover': {
                     fontWeight: 800,
                  },
               }}
               sx={{ backgroundColor: '' }}
               onClick={showProjectsPageHandler}
            >
               Projects
            </PrimaryButton>
            <PrimaryButton
               style={{
                  backgroundColor: `${projectPage ? '#fff' : '#ffd05b'}`,
                  width: '150px',
                  boxShadow: '0px 0px 5px 1px rgba(0,0,0,0)',
                  borderBottom: 'none',
                  borderRadius: '14px 14px 0 0',
                  padding: '12px 32px',
                  color: '#4d4d4d',
                  textTransform: 'capitalize',
                  fontSize: '1rem',
                  fontWeight: projectPage ? 400 : 800,
                  '&:hover': {
                     fontWeight: 800,
                  },
               }}
               onClick={showProductPageHandler}
            >
               Products
            </PrimaryButton>
         </TopButtonBox>
         <Box>
            {showForm && (
               <HeaderBox>
                  <Button
                     startIcon={<KeyboardBackspaceIcon />}
                     sx={{ color: '#4D4D4D', ml: 2.5 }}
                     onClick={backToProjectHandler}
                  >
                     Back To Project
                  </Button>
               </HeaderBox>
            )}

            {!showForm && !showProductForm && (
               <>
                  <ProjectsBox>
                     <Grid
                        container
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                        sx={{
                           display: 'flex',
                           width: '100%',
                           flexDirection: { xs: 'column', sm: 'row' },
                           flexWrap: { xs: 'nowrap', sm: 'wrap' },
                           rowGap: 2,
                           paddingLeft: { xs: 'none', sm: '1.1rem' },
                        }}
                     >
                        <Grid
                           item
                           xs={12}
                           sm={12}
                           md={6}
                           lg={4}
                           xl={3}
                           sx={{ display: { xs: 'none', sm: 'block' } }}
                        >
                           <UploadProjectBox
                              onClick={showFormHandler}
                              sx={{
                                 maxWidth:
                                    !projectPage &&
                                    !showForm &&
                                    !showProductForm
                                       ? '350px'
                                       : '350px',
                                 boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
                              }}
                           >
                              <img
                                 src='https://i.ibb.co/9TQjBdx/Group-31.png'
                                 alt='upload box'
                              />
                           </UploadProjectBox>
                        </Grid>

                        {projectPage && (
                           <>
                              {!matches ? (
                                 projects.map((project) => (
                                    <Grid
                                       item
                                       xs={12}
                                       sm={12}
                                       md={6}
                                       lg={4}
                                       xl={3}
                                    >
                                       <ProjectCard
                                          key={project.project_id}
                                          project={project}
                                          setShowForm={setShowForm}
                                          editDelete={true}
                                          setFetchProjects={setFetchProjects}
                                          projects={projects}
                                       />
                                    </Grid>
                                 ))
                              ) : (
                                 <ProjectsPageForMobile
                                    setFetchProjects={setFetchProjects}
                                    projects={projects}
                                 />
                              )}
                           </>
                        )}

                        {!projectPage && !showForm && !showProductForm && (
                           <>
                              {!matches ? (
                                 <>
                                    {product?.productData &&
                                       product?.productData?.products.map(
                                          (product) => (
                                             <Grid
                                                item
                                                xs={12}
                                                sm={12}
                                                md={6}
                                                lg={4}
                                                xl={3}
                                             >
                                                <VendorProductCard
                                                   sx={{ height: '100%' }}
                                                   editDelete={true}
                                                   product={product}
                                                   nextHandler={nextHandler}
                                                   setFetchProducts={
                                                      setFetchProducts
                                                   }
                                                   showFormHandler={
                                                      showFormHandler
                                                   }
                                                   vendorSlug={vendorSlug}
                                                />
                                             </Grid>
                                          )
                                       )}
                                 </>
                              ) : (
                                 <ProductPageForMobile
                                    setFetchProducts={setFetchProducts}
                                    products={product?.productData?.products}
                                 />
                              )}
                           </>
                        )}
                     </Grid>
                  </ProjectsBox>
                  {projectPage ? (
                     <Pagination
                        count={projectPaginationInfo?.last_page}
                        page={projectsPages}
                        onChange={(e, page) => setProjectsPages(page)}
                        color='primary'
                        shape='circle'
                        sx={{
                           '& ul': { justifyContent: 'center' },
                           mb: 3,
                           mt: 4,
                        }}
                     />
                  ) : (
                     <Pagination
                        count={productPaginationInfo?.last_page}
                        page={productsPages}
                        onChange={(e, page) => setProductsPages(page)}
                        color='primary'
                        shape='circle'
                        sx={{
                           '& ul': { justifyContent: 'center' },
                           mb: 3,
                           mt: 4,
                        }}
                     />
                  )}
               </>
            )}

            {showForm && (
               <AddProject backToProjectHandler={backToProjectHandler} />
            )}

            {showProductForm && (
               <SearchProduct
                  showProductPageHandler={showProductPageHandler}
                  nextHandler={nextHandler}
                  searchProductPage={searchProductPage}
                  customizeProductPage={customizeProductPage}
                  setFetchProducts={setFetchProducts}
               />
            )}
         </Box>
      </ProjectsPageBox>
   );
};

export default ProjectsPage;

// https://i.ibb.co/prSrHsx/Rectangle-79.png
// https://i.ibb.co/qnGsGWf/Rectangle-80.png
// https://i.ibb.co/Yt3y0wS/Rectangle-81.png
// https://i.ibb.co/w0Jk1B8/Rectangle-82.png
