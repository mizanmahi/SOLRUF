import { Divider, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import FeatureDetail from '../FeatureDetail/FeatureDetail';
import RoundedDarkButton from '../RoundedDarkButton/RoundedDarkButton';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaymentsIcon from '@mui/icons-material/Payments';
import DescriptionIcon from '@mui/icons-material/Description';

import { DownloadChip } from '../CustomerDetailsDrawer/customerDetailsDrawer.style';

const Wrapper = styled(Box)(({ theme }) => ({
   padding: '1rem',

   background: '#FFFFFF',
   borderRadius: '10px',
}));

const Flex = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
}));

export const Textarea = styled('textarea')(({ theme }) => {
   return {
      width: '100%',
      margin: '.6rem 0 0rem 0',
      border: '2px solid #FFD05B !important',
      background: '#F3F3F3',
      borderRadius: '10px',
      outline: 'none',
      padding: '1rem',
      fontFamily: theme.typography.fontFamily,
   };
});

const VendorDetailsForPurchaseDetailsPage = ({
   vendorData,
   enquiryId,
   bid_documents = [],
}) => {
   console.log({
      vendorData,
   })
   return (
      <Wrapper>
         <Flex sx={{ mb: 1, alignItems: 'center' }}>
            <Typography variant='h5'>
               {vendorData?.bid_details?.vendor_name}
            </Typography>
            <a
               href={`https://solruf.com/portfolio/${vendorData?.vendor?.portfolio?.slug}`}
               alt='go to portfolio'
               target='_blank'
               rel='noreferrer'
            >
               <RoundedDarkButton title='Check Detail Portfolio' />
            </a>
         </Flex>

         <Typography variant='h6'>Bidding Details</Typography>
         <Divider sx={{ mt: 1 }} />

         <Flex
            sx={{
               justifyContent: 'flex-start',
               alignItems: 'flex-start',
               mt: 3,
            }}
         >
            <Box sx={{ mr: 2, minWidth: '50%' }}>
               <FeatureDetail
                  title='Bidding Price'
                  value={
                     vendorData?.total_price /
                     vendorData?.quantity
                  }
                  icon={<LocalAtmIcon />}
               />
               <FeatureDetail
                  title='Advanced Payment'
                  value={vendorData?.details[0]?.advance_payment}
                  icon={<PaymentsIcon />}
               />

               <FeatureDetail
                  valueStyle={{
                     maxWidth: '500px',
                  }}
                  title='Total Price'
                  value={vendorData?.total_price}
                  icon={<DescriptionIcon />}
               />
            </Box>
            <Box>
               <FeatureDetail
                  title='Booking Price'
                  value={vendorData?.booking_price}
                  icon={<LocalAtmIcon />}
               />

               <FeatureDetail
                  title='Warranty Years'
                  value={vendorData?.warranty_years}
                  icon={<CalendarTodayIcon />}
               />

               <FeatureDetail
                  valueStyle={{
                     maxWidth: '500px',
                  }}
                  title='Description'
                  value={vendorData?.bid_details?.description}
                  icon={<DescriptionIcon />}
               />
            </Box>
         </Flex>

         <Flex
            sx={{
               my: 3,
               flexWrap: 'wrap',
               rowGap: '1',
               justifyContent: 'start',
            }}
         >
            {bid_documents?.map((document) => (
               <DownloadChip
                  sx={{ mr: 0.5, mb: 1 }}
                  label={document.name}
                  onClick={() => console.log('Clicked')}
                  component='a'
                  href={document.url}
                  target='_blank'
               />
            ))}
         </Flex>

         {/* ================== query section ================== */}
         {/* <Typography variant='h6'>Queries</Typography>
         <Divider sx={{ mt: 1 }} /> */}
      </Wrapper>
   );
};

export default VendorDetailsForPurchaseDetailsPage;
