import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CreatePortfolioWrapper = styled(Box)(({ theme }) => ({
   height: '337px',
   borderRadius: '10px',
   background: '#ffffff',
   boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   position: 'relative',
}));

const Dots = styled(Box)(({ theme }) => ({
   position: 'absolute',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   top: '1rem',
   right: '1rem',
}));

const Dot1 = styled(Box)(({ theme, active }) => ({
   width: '10px',
   height: '10px',
   borderRadius: '50%',
   transition: 'all .2s ease-in-out',
   transform: active === 1 ? 'scale(1.7)' : 'scale(1)',
   background:
      active === 1 ? theme.palette.primary.main : theme.palette.secondary.main,
   '&:not(:last-child)': {
      marginRight: '.8rem',
   },
}));

const Dot2 = styled(Box)(({ theme, active }) => ({
   width: '10px',
   height: '10px',
   borderRadius: '50%',
   transition: 'all .2s ease-in-out',
   transform: active === 2 ? 'scale(1.7)' : 'scale(1)',
   background:
      active === 2 ? theme.palette.primary.main : theme.palette.secondary.main,
   '&:not(:last-child)': {
      marginRight: '.8rem',
   },
}));

const Dot3 = styled(Box)(({ theme, active }) => ({
   width: '10px',
   height: '10px',
   borderRadius: '50%',
   transition: 'all .2s ease-in-out',
   transform: active === 3 ? 'scale(1.7)' : 'scale(1)',
   background:
      active === 3 ? theme.palette.primary.main : theme.palette.secondary.main,
   '&:not(:last-child)': {
      marginRight: '.8rem',
   },
}));

const Content = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   '& svg': {
      marginBottom: '1rem',
   },
}));

const Text = styled(Typography)(({ theme }) => ({
   fontSize: '1.6rem',
   fontWeight: 'bold',
   color: '#000000',
   textAlign: 'center',
   marginBottom: '.5rem',
}));

const NextButton = styled(Box)(({ theme }) => ({
   background: theme.palette.primary.main,
   borderRadius: '50%',
   width: '3.5rem',
   height: '3.5rem',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginTop: '1rem',
   cursor: 'pointer',
   '&:hover svg': {
      fill: '#000000',
      transform: 'translateX(2px)',
   },
   '& svg': {
      margin: 0,
      fontSize: '30px',
   },
}));

const CreatePortfolioBox = () => {
   const [active, setActive] = useState(2);

   return (
      <CreatePortfolioWrapper>
         <Dots>
            <Dot1 active={active} />
            <Dot2 active={active} />
            <Dot3 active={active} />
         </Dots>

         {/* <Content>
            <svg
               width='108'
               height='107'
               viewBox='0 0 108 107'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  d='M2.88477 2.88379H105.001V105H2.88477V2.88379Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M2.88477 20.6436H105.001'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M98.342 11.7637H93.9023'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M89.4631 11.7637H85.0234'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M80.5822 11.7637H76.1426'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M65.0438 11.7637H11.7656'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M49.504 40.6231C49.504 45.5271 45.5283 49.503 40.6241 49.503C35.7198 49.503 31.7441 45.5273 31.7441 40.6231C31.7441 35.7188 35.7198 31.7432 40.6241 31.7432C45.5283 31.7432 49.504 35.7188 49.504 40.6231Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M61.2683 61.9342C59.7144 59.0485 56.8287 56.6066 53.4988 55.4964L51.7227 55.0527L40.6231 66.1524L29.5234 55.0527L27.9695 55.4964C22.1975 57.2725 18.4238 62.3779 18.4238 68.3722V80.5813H54.6086'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <circle cx='72.002' cy='76' r='16' fill='#FFD05B' />
               <path
                  d='M89.4619 76.1415C89.4619 85.9496 81.5113 93.9011 71.703 93.9011C61.8949 93.9011 53.9434 85.9496 53.9434 76.1415C53.9434 66.3334 61.8949 58.3818 71.703 58.3818C81.511 58.3818 89.4619 66.3334 89.4619 76.1415Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M71.7031 87.2412V65.042'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M82.8028 76.1416H60.6035'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
            </svg>
            <Text>Create Portfolio</Text>
            <Typography variant='h6'>
               Create your Portfolio with Projects & Products
            </Typography>
            <NextButton>
               <ArrowForwardIcon />
            </NextButton>
         </Content> */}

         {/*  step 2 */}

         <Content>
            <svg
               width='108'
               height='107'
               viewBox='0 0 108 107'
               fill='none'
               xmlns='http://www.w3.org/2000/svg'
            >
               <path
                  d='M2.88477 2.88379H105.001V105H2.88477V2.88379Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M2.88477 20.6436H105.001'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M98.342 11.7637H93.9023'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M89.4631 11.7637H85.0234'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M80.5822 11.7637H76.1426'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M65.0438 11.7637H11.7656'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M49.504 40.6231C49.504 45.5271 45.5283 49.503 40.6241 49.503C35.7198 49.503 31.7441 45.5273 31.7441 40.6231C31.7441 35.7188 35.7198 31.7432 40.6241 31.7432C45.5283 31.7432 49.504 35.7188 49.504 40.6231Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M61.2683 61.9342C59.7144 59.0485 56.8287 56.6066 53.4988 55.4964L51.7227 55.0527L40.6231 66.1524L29.5234 55.0527L27.9695 55.4964C22.1975 57.2725 18.4238 62.3779 18.4238 68.3722V80.5813H54.6086'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
               <path
                  d='M89.4619 76.1415C89.4619 85.9496 81.5113 93.9011 71.703 93.9011C61.8949 93.9011 53.9434 85.9496 53.9434 76.1415C53.9434 66.3334 61.8949 58.3818 71.703 58.3818C81.511 58.3818 89.4619 66.3334 89.4619 76.1415Z'
                  stroke='#4D4D4D'
                  stroke-width='4'
                  stroke-miterlimit='10'
               />
            </svg>

            <Text>Share Portfolio</Text>
            <Typography variant='h6'>
               Share your Created Profile with Customers
            </Typography>
            <NextButton>
               <ArrowForwardIcon />
            </NextButton>
         </Content>

         <Content></Content>
      </CreatePortfolioWrapper>
   );
};

export default CreatePortfolioBox;
