import React from 'react';
import './EnquiryForm.css';
import { useState } from 'react';

export const CreateEnquiry = () => {
  const [quantity, setQuantity] = useState(0);

  return (
    <div>
      <div className='container'>
        <div className='row'>
          <div className='white-shadow col-12'>
            <div className='row p-2'>
              <div className='col-md-7'>
                <h4 className='h3_title'>Create an Enquiry</h4>
              </div>
              <div className='col-md-5  red-box'>
                <span>
                  Get access to top 10 verified source and supplier for you your
                  enquiry
                </span>
              </div>
              <div className='col-12 row  mt-4 '>
                <div className='form-row col-md-10 dflex '>
                  <div>Quatity</div>
                  <div className='number'>
                    <input
                      className='enquiry-input'
                      type='text'
                      defaultValue={1}
                      value={quantity}
                    />
                    <span
                      className='minus action-span'
                      style={{ marginLeft: '0.2rem' }}
                      onClick={setQuantity(quantity - 1)}
                    >
                      -
                    </span>
                    <span
                      className='plus action-span'
                      style={{ marginLeft: '0.2rem' }}
                    >
                      +
                    </span>
                  </div>
                </div>
                <div className='form-row col-md-2'>
                  <input type='date' className='dates' />
                </div>
                <div className='form-row col-md-4'>
                  <input
                    type='text'
                    placeholder='Pincode'
                    className='form-control'
                  />
                </div>
                <div className='form-row col-md-8'>
                  <select name className='form-control' id>
                    <option value>State</option>
                  </select>
                </div>
                <div className='form-row col-md-12'>
                  <input
                    type='text'
                    placeholder='City/Distrit/Town'
                    className='form-control'
                  />
                </div>
                <div className='form-row col-md-12'>
                  <textarea
                    name
                    placeholder='Address'
                    className='form-control'
                    id
                    cols={10}
                    rows={4}
                    defaultValue={''}
                  />
                </div>
                <div className='form-row col-md-12'>
                  <input type='checkbox' className='checkbox-enquiry' name id />
                  <label htmlFor className='accept-text'>
                    Accept Products from other Brand?
                  </label>
                </div>
                <div className='form-row text-center col-md-12'>
                  <button className='sumbit btn long-btn'>
                    Next <i className='fa fa-arrow-right' />{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
