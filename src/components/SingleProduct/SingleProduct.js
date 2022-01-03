import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import ProductDetailList from '../ProductDetailList/ProductDetailList'
import SliderWithCustomImagePreview from '../SliderWithCustomImagePreview/SliderWithCustomImagePreview'

const SingleProduct = () => {
    return (
        <Box sx={{my: 5,}}>
        <Grid container spacing={5} alignItems='center'>
           <Grid item md={6} lg={5}>
              {/* ================== Slider with custom image preview indicator */}
              <SliderWithCustomImagePreview />
           </Grid>
           {/*  === description list start === */}
           <Grid item md={6} lg={7}>
              <Box>
                 <Typography variant='h5' fontWeight={500}>
                    24-inch Solar Cables (10x Powerful) fully ready to
                    Functional Power Cables
                 </Typography>
                 {/* ====== Nested Grid Start ====== */}
                 <Grid container item spacing={2}>
                    <Grid item sm={6}>
                       <ProductDetailList
                          list='Price/Watt'
                          description='Rs 256/sq.ft.'
                       />
                       <ProductDetailList
                          list='Price Of Panel'
                          description='Rs 2500000'
                       />
                       <ProductDetailList
                          list='Power Capacity'
                          description='1024 Watts'
                       />
                    </Grid>
                    <Grid item sm={6}>
                       <ProductDetailList
                          list='Inverter Type'
                          description='Offgrid/ongrid'
                          hand='hand'
                       />
                       <ProductDetailList
                          list='Location'
                          description='Jaipur'
                          hand='hand'
                       />
                       <ProductDetailList
                          list='Company'
                          description='Amaron'
                          hand='hand'
                       />
                    </Grid>
                 </Grid>
                 {/* ====== Nested Grid Ends ====== */}
                 <Typography variant='body1' sx={{ mt: 2 }}>
                    <strong>Description: </strong> Lorem ipsum dolor
                    sit amet consectetur adipisicing elit. Cum iste
                    quidem ea quia sapiente magnam animi voluptatum
                    nihil repellat optio dicta voluptates adipisci
                    vero hic ullam, dolores impedit dignissimos alias.
                 </Typography>
                 <Typography
                    variant='h6'
                    component='a'
                    href='#'
                    sx={{
                       textAlign: 'right',
                       display: 'block',
                       color: '#0339A6',
                       textDecoration: 'none',
                       mt: 2
                    }}
                 >
                    See Detailed Product Description...
                 </Typography>
              </Box>
           </Grid>
        </Grid>
     </Box>
    )
}

export default SingleProduct
