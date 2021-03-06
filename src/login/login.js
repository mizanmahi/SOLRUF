import React, { useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './styles.css';
import Welcome from './welcome';
import Checkuser from './checkuser';
import axios from 'axios';
import domainName from '../domain/domainname.json';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { saveUser } from '../redux/slices/userSlice';
import { Box } from '@mui/system';
import { closeLoginModal } from '../redux/slices/loginModalSlice';

function Login(props) {
   // console.log(props.number)
   const [msg, setMsg] = useState('');
   const [otpinput, setOtp] = useState('');
   const [switching, setSwitch] = useState('');
   const [border, setBorder] = useState({
      border: '1px solid #ffba08',
   });

   const navigate = useNavigate();

   function resendOTPHandle() {
      axios.post(`${domainName.domain}`, {
         mobile: `${props.number.phone}`,
      });
   }

   const [loading, setLoading] = useState(false);

   const dispatch = useDispatch();

   function confirmHandle(e) {
      e.preventDefault();
      let getvalue = JSON.parse(window.localStorage.getItem('user'));

      setLoading(true);

      axios
         .post('https://api-dev.solruf.com/api/verify-otp', {
            mobile: `${props.number?.phone}`,
            otp: otpinput,
         })
         .then(({ data }) => {
            setSwitch('welcome');
            setMsg('');
            setBorder({
               border: '1px solid #ffba08',
            });

            dispatch(saveUser(data));
            setLoading(false);
            props.setUser(data); // setting user info to the local storage
            // props.setShowDashboard(true); // setting the dashboard menu to be visible
            // navigate('/dashboard'); // navigating to the dashboard
            setMsg('');
            dispatch(closeLoginModal());
         })
         .catch((d) => {
            setSwitch('same');
            setMsg('Invalid OTP, Please try again');
            setBorder({
               border: '1px solid #ffba08',
            });
            setLoading(false);
            props.setUser(null);
         });
   }

   return switching === 'welcome' ? (
      <Welcome />
   ) : switching === 'ragister' ? (
      <Checkuser number={props.number} />
   ) : (
      <div className='login_container'>
         <div className='form_logo'>
            <div>Login</div>
         </div>
         <div className='signup-message'>
            <div className='backarrow'>
               <ArrowBackIcon
                  style={{ color: 'grey', fontSize: '20px' }}
                  onClick={() => setSwitch('ragister')}
               />
            </div>
            <div className='message'>
               Enter OTP Sent To {props.number?.phone}
            </div>
         </div>
         <div style={{ color: 'red' }} className='errormsg'>
            {msg}
         </div>
         <Box className='loginVerificatinInputButton'>
            <input
               style={border}
               className='login-input'
               type='text'
               onChange={(e) => setOtp(e.target.value)}
               placeholder='Enter OTP'
            />
            <button
               className='login-btn'
               onClick={resendOTPHandle}
               type='button'
               style={{ padding: '0px .8rem' }}
            >
               Resend OTP
            </button>
            <br />
         </Box>
         {loading ? (
            <Loader />
         ) : (
            <button onClick={confirmHandle} className='conf-resend-sms'>
               Verify
            </button>
         )}
      </div>
   );
}

export default Login;


// verify response
/* 
{
    "message": "OTP Verified",
    "token": "46|7ku5DrgDMQPuE6ZM98Y7UrbUGIo75O8Kn32kJEhD",
    "user": {
        "first_name": "Sumit",
        "last_name": "Agar.",
        "email": "sazzzadh888@gmail.com",
        "mobile": "9932383997",
        "profile_image": null
    }
} 
*/