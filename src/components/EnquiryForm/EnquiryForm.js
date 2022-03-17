import React from 'react';
import './EnquiryForm.css';

export const EnquiryForm = () => {
  return (
    <div
      className='d-flex justify-content-center align-items-center'
      style={{ height: '100vh' }}
    >
      <div className='container'>
        <div className='row'>
          <div className='white-shadow col-12'>
            <div className='row p-2'>
              <div className='text-center col-md-12 dflex'>
                <span className='left-arrow back-right dflex back-font'>
                  {/* <img src={imgA} alt='' /> &nbsp;&nbsp; */}
                  <span className='pt-1'>Back</span>
                </span>
                <h4 className='h3_title text-center'>Company Details</h4>
              </div>
              <div className='col-12 row  mt-4'>
                <div className='table-repsonive p-2 w-100'>
                  <table className='enquiry-table table w-100'>
                    <tbody>
                      <tr>
                        <td>
                          {/* <img src={imgB} alt='' srcSet /> */}
                          <span>Company Name:-</span>
                        </td>
                        <td>Aman Jain</td>
                      </tr>
                      <tr>
                        <td>
                          {/* <img src={imgC} alt='' srcSet /> */}
                          <span>GST No:-</span>
                        </td>
                        <td>27ABFCS2596E1Z4</td>
                      </tr>
                      <tr>
                        <td>
                          {/* <img src={imgD} alt='' srcSet /> */}
                          <span>City:-</span>
                        </td>
                        <td>Mumbai</td>
                      </tr>
                      <tr>
                        <td>
                          {/* <img src={imgE} alt='' srcSet /> */}
                          <span>Pincode/Zipcode:-</span>
                        </td>
                        <td>110026</td>
                      </tr>
                      <tr>
                        <td>
                          {/* <img src={imgA} alt='' srcSet /> */}
                          <span>State:-</span>
                        </td>
                        <td>Maharashtra</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className='form-row col-md-12'>
                  <input type='checkbox' className='checkbox-enquiry' name id />
                  <label htmlFor className='accept-text'>
                    Share your Company Information with Supplier?
                  </label>
                </div>
                <div className='form-row text-center col-md-12'>
                  <button className='sumbit btn long-btn'>Submit </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
