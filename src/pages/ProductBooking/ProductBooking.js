import { Container, Grid, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from 'react-router-dom';
import ProfileFooter from '../../components/ProfileFooter/ProfileFooter';
import ProfileHeader from '../../components/ProfileHeader/ProfileHeader';
import LeftProductFilter from '../../components/LeftProductFilter/LeftProductFilter';
import ProductCardForPortfolio from '../../portfolio/BookProducts/ProductCardForPortfolio';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PrimaryButton from '../../components/Custom/PrimaryButton/PrimaryButton';
import SolrufModal from '../../components/Custom/SolrufModal/SolrufModal';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const Wrapper = styled(Box)(({ theme }) => ({
   backgroundColor: theme.palette.primary.light,
}));
const Nav = styled(Box)(({ theme }) => ({
   padding: '1rem 0',
}));

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

const ProductBooking = () => {
   const navigate = useNavigate();
   const portfolioData = useSelector((state) => state.portfolio.portfolioData);

   const [activeCategory, setActiveCategory] = useState('');
   const [filterCategory, setFilterCategory] = useState(sortCategories);

   const handleActiveCategory = (category) => {
      setActiveCategory(category);
      console.log(category);
   };

   const [displayProducts, setDisplayProducts] = useState(
      portfolioData.products
   );

   useEffect(() => {
      if (activeCategory) {
         setDisplayProducts(() => {
            return portfolioData.products.filter((product) => {
               console.log({
                  product: product.main_category.name,
                  activeCategory: activeCategory,
               });
               return product.main_category.name === activeCategory;
            });
         });
      } else {
         setDisplayProducts(portfolioData.products);
      }
   }, [activeCategory, portfolioData.products]);

   const [showFilterModal, setShowFilterModal] = useState(false);

   const props = {
      activeCategory,
      setActiveCategory,
      filterSort: filterCategory,
      setFilterSort: setFilterCategory,
      handleActiveCategory,
      categories,
      sortCategories,
   };

   return (
      <>
         <ProfileHeader />
         <Wrapper>
            <Nav sx={{ mb: 3, position: 'relative' }}>
               <Container maxWidth='xl'>
                  <Box sx={{ position: 'relative' }}>
                     <Typography
                        textAlign='center'
                        variant='h3'
                        sx={{
                           fontSize: ['1.2rem', '2rem', '2.5rem'],
                        }}
                     >
                        Book Products In Advance
                     </Typography>
                     <Box
                        sx={{
                           '@media (max-width: 600px)': {
                              marginTop: '2rem',
                           },
                        }}
                     >
                        <KeyboardBackspaceIcon
                           sx={{
                              position: 'absolute',
                              top: '50%',
                              transform: 'translateY(-50%)',
                              fontSize: '35px',
                              fontWeight: 600,
                              cursor: 'pointer',
                           }}
                           onClick={() => navigate(-1)}
                        />
                        <Typography variant='body2'>
                           Back To Portfolio
                        </Typography>
                     </Box>
                  </Box>
               </Container>
            </Nav>
            <Container maxWidth='xl' sx={{ pb: 4 }}>
               <Grid container spacing={4}>
                  <Grid item xs={12} md={3}>
                     <Box
                        sx={{
                           display: ['none', 'block'],
                        }}
                     >
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
                        <LeftProductFilter {...props} sx={{ my: 3 }} />
                     </SolrufModal>
                  </Grid>
                  <Grid container spacing={2} item xs={12} md={9}>
                     {displayProducts
                        ?.filter((prod) => prod.details.booking_availability)
                        ?.map((product, i) => (
                           <Grid item xs={12} md={6} lg={4} key={i}>
                              <ProductCardForPortfolio
                                 product={product}
                                 actionType='purchase'
                              />
                           </Grid>
                        ))}
                  </Grid>
               </Grid>
            </Container>
         </Wrapper>
         <ProfileFooter />
      </>
   );
};

export default ProductBooking;
