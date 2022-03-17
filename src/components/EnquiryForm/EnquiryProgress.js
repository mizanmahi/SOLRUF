import React from 'react';
import enquirySuccess from '../../icons/message.png';
import './EnquiryForm.css';

export const EnquiryProgress = () => {
  return (
    <div>
      <div
        className='container d-flex justify-content-center align-items-center'
        style={{ height: '100vh' }}
      >
        <div className='row'>
          <div className='white-shadow col-12'>
            <div className='row p-2'>
              <div className='col-12 pt-5 pb-5 text-center'>
                <span>
                  <img src={enquirySuccess} alt='' srcSet />
                </span>
              </div>
              <div className='col-12 pb-5 text-center'>
                <h2 className='h2_success'>Enquiry Send!</h2>
                <h3 className='h3_success'>
                  We will Provide you with the bids <br /> from 10 best Vendors
                  in 60 min
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
