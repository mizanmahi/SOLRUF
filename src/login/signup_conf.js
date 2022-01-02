import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Welcome from './welcome';
import Signup from './signup';
import './styles.css';
import axios from 'axios';
import domainName from '../domain/domainname.json';
import { Typography } from '@mui/material';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';

console.log(domainName.domain);

function Signupconf(props) {

   const [user, setUser] = useLocalStorage('user', null)
   const navigate = useNavigate();

   console.log(props.number);
   const [otpinput, setOtp] = useState('');
   const [switching, setSwitch] = useState('');
   let [msg, setMsg] = useState('');

   const [bordercol, setBorderColor] = useState({
      border: '1px solid #ffba08',
   });

   function resendOTPHandle() {
      axios.post(`${domainName.domain}login`, {
         mobile: `${props.number.phone}`,
      });
   }

   function confirmHandle(e) {
      e.preventDefault();
      let getvalue = JSON.parse(window.localStorage.getItem('user'));
      console.log(getvalue);

      axios
         .post(`${domainName.domain}verify-otp`, {
            mobile: `${props.number.phone}`,
            otp: otpinput,
         })
         .then(({data}) => {
            setSwitch('welcome');
            setMsg('');
            setBorderColor({
               border: '1px solid #ffba08',
            });

            setUser(data)
            console.log(data);
            props.setShowDashboard(true);
            navigate('/dashboard'); // navigating to the dashboard
         })
         .catch((d) => {
            setSwitch('same');
            setMsg('Please enter valid otp');
            setBorderColor({
               border: '1px solid #ffba08',
            });
            window.sessionStorage.setItem(
               'dash',
               JSON.stringify({ display: 'hidden' })
            );
         });
   }

   return switching === 'welcome' ? (
      <Welcome />
   ) : switching === 'signup' ? (
      <Signup number={props.number} />
   ) : (
      <div className='conf_container'>
         <div className='form_logo'>
            <div>Sign Up | Login</div>
         </div>
         <div className='signup-message'>
            <div className='backarrow'>
               <ArrowBackIcon
                  style={{ color: 'grey', fontSize: '20px' }}
                  onClick={() => setSwitch('signup')}
               />
            </div>
            <Typography variant='body2' className='message'>
               Enter OTP sent to {props.number.phone}.
            </Typography>
         </div>
         <form style={{marginTop: '2rem'}}>
            <div className='otpConfirmationInputButton'>
               <div style={{ color: 'red' }} className='errormsg'>
                  {msg}
               </div>
               <input
                  style={bordercol}
                  className='input_otp'
                  onChange={(e) => setOtp(e.target.value)}
                  type='text'
                  placeholder='Enter OTP'
               />
               <button
                  className='otp-cnf-btn'
                  onClick={resendOTPHandle}
                  type='button'
               >
                  Resend OTP
               </button>
               <br />
            </div>
            <button className='conf-resend-sms' onClick={confirmHandle}>
               Verify
            </button>
         </form>
      </div>
   );
}

export default Signupconf;
