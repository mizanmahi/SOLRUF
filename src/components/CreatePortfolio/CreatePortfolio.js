import { Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const CreatePortfolioWrapper = styled(Box)(({ theme }) => ({
   minHeight: '337px',
   borderRadius: '10px',
   background: '#ffffff',
   boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.1)',
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   position: 'relative',
   paddingTop:'2rem',
   paddingBottom:'2rem',
}));

const ContentsBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-around',
   alignItems: 'center',
   "@media (max-width: 600px)": {
      flexDirection:'column',
      rowGap:'1rem'
   }
}));

const Content = styled(Box)(({ theme }) => ({
   display: 'flex',
   flexDirection: 'column',
   justifyContent: 'center',
   alignItems: 'center',
   maxWidth: '300px',
   '& p': {
      textAlign: 'center',
   },
}));

const NumberCircle = styled(Box)(({ theme }) => ({
   width: '34px',
   height: '34px',
   borderRadius: '50%',
   background: '#FFD05B',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginRight: '10px',
   fontSize: '18px',
   fontWeight: 'bold',
   fontFamily: 'inherit',
}));

const ButtonBox = styled(Box)(({ theme }) => ({
   background: '#FFD05B',
   borderRadius: '40px',
   border: '5px solid #4D4D4D',
   width: '100%',
   maxWidth: '280px',
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   padding: '.4rem 1rem',
   alignSelf: 'center',
   marginTop: '2rem',
   cursor: 'pointer',
   '& p': {
      fontSize: '1.1rem',
      fontWeight: 'bold',
      fontFamily: 'inherit',
      color: '#000000',
   },
   '& svg': {
      fontSize: '30px',
      color: '#000000',
      transition: 'all .1s',
   },
   '&:hover svg': {
      transform: 'translateX(3px)',
   },
}));

const Text = styled(Typography)(({ theme }) => ({
   position: 'absolute',
   fontSize: '1.2rem',
   fontWeight: 'bold',
   top: '10px',
   left: '10px',
}));

const CreatePortfolio = ({ createPortfolioHandler }) => {
   return (
      <CreatePortfolioWrapper>
         <Text>My Portfolio</Text>
         <ContentsBox>
            <Content sx={{ mr: 3 }}>
               <svg
                  width='83'
                  height='83'
                  viewBox='0 0 83 83'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     d='M1.9082 1.90863H81.9996V82H1.9082V1.90863Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M1.9082 15.8377H81.9996'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M76.777 8.87311H73.2949'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M69.8121 8.87311H66.3301'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M62.8473 8.87311H59.3652'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M50.6599 8.87311H8.87305'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M38.4723 31.5078C38.4723 35.3541 35.3541 38.4724 31.5076 38.4724C27.6611 38.4724 24.543 35.3543 24.543 31.5078C24.543 27.6613 27.6611 24.5432 31.5076 24.5432C35.3541 24.5432 38.4723 27.6613 38.4723 31.5078Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M47.6992 48.2225C46.4805 45.9592 44.2172 44.044 41.6055 43.1733L40.2125 42.8253L31.5069 51.5309L22.8013 42.8253L21.5825 43.1733C17.0554 44.5663 14.0957 48.5706 14.0957 53.2719V62.8477H42.4759'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <ellipse
                     cx='56.1174'
                     cy='59.2549'
                     rx='12.549'
                     ry='12.549'
                     fill='#FFD05B'
                  />
                  <path
                     d='M69.8128 59.3657C69.8128 67.0583 63.577 73.2948 55.8842 73.2948C48.1916 73.2948 41.9551 67.0583 41.9551 59.3657C41.9551 51.673 48.1916 45.4365 55.8842 45.4365C63.5768 45.4365 69.8128 51.673 69.8128 59.3657Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M55.8828 68.0713V50.6601'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M64.5889 59.3657H47.1777'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
               </svg>

               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NumberCircle>1</NumberCircle>
                  <Typography
                     variant='h6'
                     sx={{ color: '#000000', fontWeight: 'bold', my: 1 }}
                  >
                     Create Portfolio
                  </Typography>
               </Box>
               <Typography sx={{ fontSize: '15px' }}>
                  Share your Portfolio as a Digital shop with your clients
               </Typography>
            </Content>
            <Content>
               <svg
                  width='83'
                  height='83'
                  viewBox='0 0 83 83'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
               >
                  <path
                     d='M1.9082 1.90863H81.9996V82H1.9082V1.90863Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M1.9082 15.8377H81.9996'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M76.777 8.87311H73.2949'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M69.8121 8.87311H66.3301'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M62.8473 8.87311H59.3652'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M50.6599 8.87311H8.87305'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M38.4723 31.5078C38.4723 35.3541 35.3541 38.4724 31.5076 38.4724C27.6611 38.4724 24.543 35.3543 24.543 31.5078C24.543 27.6613 27.6611 24.5432 31.5076 24.5432C35.3541 24.5432 38.4723 27.6613 38.4723 31.5078Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M47.6992 48.2225C46.4805 45.9592 44.2172 44.044 41.6055 43.1733L40.2125 42.8253L31.5069 51.5309L22.8013 42.8253L21.5825 43.1733C17.0554 44.5663 14.0957 48.5706 14.0957 53.2719V62.8477H42.4759'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M69.8128 59.3657C69.8128 67.0583 63.577 73.2948 55.8842 73.2948C48.1916 73.2948 41.9551 67.0583 41.9551 59.3657C41.9551 51.673 48.1916 45.4365 55.8842 45.4365C63.5768 45.4365 69.8128 51.673 69.8128 59.3657Z'
                     stroke='#4D4D4D'
                     stroke-width='2'
                     stroke-miterlimit='10'
                  />
                  <path
                     d='M56.1174 46.7059C49.2154 46.7059 43.5684 52.3529 43.5684 59.2549C43.5684 66.1568 49.2154 71.8039 56.1174 71.8039C63.0193 71.8039 68.6664 66.1568 68.6664 59.2549C68.6664 52.3529 63.0193 46.7059 56.1174 46.7059ZM58.6272 64.2745V60.5098C54.097 60.5098 50.8593 62.3043 48.588 65.5294C49.4915 60.9239 52.2774 56.4063 58.6272 55.4902V51.7255L64.9017 58L58.6272 64.2745Z'
                     fill='#2448FC'
                  />
               </svg>

               <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <NumberCircle>2</NumberCircle>
                  <Typography
                     variant='h6'
                     sx={{ color: '#000000', fontWeight: 'bold', my: 1 }}
                  >
                     Share Portfolio
                  </Typography>
               </Box>
               <Typography sx={{ fontSize: '15px' }}>
                  Share your Portfolio as a Digital shop with your clients
               </Typography>
            </Content>
         </ContentsBox>
         <ButtonBox onClick={createPortfolioHandler}>
            <Typography>Create Your Portfolio</Typography>
            <ArrowForwardIcon />
         </ButtonBox>
      </CreatePortfolioWrapper>
   );
};

export default CreatePortfolio;
