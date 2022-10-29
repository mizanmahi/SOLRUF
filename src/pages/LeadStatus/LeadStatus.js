import { Fragment } from 'react';

var boxVariaNt = {
   OPEN: { bgColor: '#81D742', txtColor: '#000000' },
   CLOSED: { bgColor: '#FF3838', txtColor: '#FFFFFF' },
   'NOT INTERESTED': { bgColor: '#950000', txtColor: '#FFFFFF' },
   OPPORTUNITY: { bgColor: '#FF510C', txtColor: '#FFFFFF' },
   Enquiry: { bgColor: '#0097D3', txtColor: '#FFFFFF' },
   DISQUALIFIED: { bgColor: '#0097D3', txtColor: '#FFFFFF' },
   CUSTOMER: { bgColor: '#9C54D6', txtColor: '#FFFFFF' },
   WORKING: { bgColor: '#1AA69D', txtColor: '#FFFFFF' },
   PROSPECT: { bgColor: '#FF9240', txtColor: '#000000' },
   ENQUIRY: { bgColor: '#0097D3', txtColor: '#FFFFFF' },
   ORDER: { bgColor: '#81D742', txtColor: '#000000' },
   CANCELLED: { bgColor: '#000000', txtColor: '#FFFFFF' },
   CONFIRMED: { bgColor: '#000000', txtColor: '#FFFFFF' },
   SALES: { bgColor: '#81D742', txtColor: '#000000' },
};

export default function LeadStatus({ boxVariant }) {
   return (
      <Fragment>
         <span
            style={{
               background: boxVariaNt[boxVariant]
                  ? boxVariaNt[boxVariant].bgColor
                  : '',
               borderRadius: '50px',
               padding: '3px 8px',
               color: boxVariaNt[boxVariant]
                  ? boxVariaNt[boxVariant].txtColor
                  : '',
               fontFamily: 'Inter',
               fontSize: '12px',
               fontWeight: '600',
            }}
         >
            {boxVariant}
         </span>
      </Fragment>
   );
}
