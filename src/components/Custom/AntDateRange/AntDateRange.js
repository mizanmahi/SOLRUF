import React from 'react';
import { DatePicker } from 'antd';
import './antDateRange.css';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/system';

const { RangePicker } = DatePicker;

const Wrapper = styled(Box)(({ theme }) => ({
   padding: '5px 0',
   background: '#fff',
   borderRadius: '5px',
   display: 'flex',
   alignItems: 'center',
   boxShadow: '0px 4px 24px 0  rgba(0, 69, 184, 0.15)',
   '& p': {
      paddingLeft: '8px',
      fontSize: '1rem',
      paddingBottom: '2px',
      color: '#000',
   },
}));

const AntDateRange = ({ date, setDate }) => {
   const dateRangeHandler = (date) => {
      setDate({
         from_date: date && date[0]?._d,
         to_date: date && date[1]?._d,
      });
   };
   return (
      <Wrapper>
         <Box>
            <Typography
               sx={{
                  width: '100px',
               }}
            >
               Date Range
            </Typography>
         </Box>
         <RangePicker
            allowClear={true}
            bordered={false}
            className='ant-date-picker'
            onChange={dateRangeHandler}
         />
      </Wrapper>
   );
};

export default AntDateRange;
