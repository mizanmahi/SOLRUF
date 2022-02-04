import React, { useState } from 'react';
import Confirm from './signup_conf';
import Checkuser from './checkuser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import domainName from '../domain/domainname.json';
import { Box, styled, Typography } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

const UserTypeBox = styled(Box)(({ theme }) => ({
   display: 'block',
   padding: '1rem 0',
}));

const UserBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',
   marginBottom: '1rem',
   cursor: 'pointer',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));
const VendorBox = styled(Box)(({ theme }) => ({
   display: 'flex',
   justifyContent: 'space-between',
   background: '#D0D7D9',
   padding: '.5rem',
   borderRadius: '6px',
   border: '2px solid #000000',
   cursor: 'pointer',
   flex: 1,
   '&:hover': {
      opacity: '0.9',
   },
}));

const Text = styled(Box)(({ theme }) => ({
   textAlign: 'right',
   flex: '1',
}));

const Circle = styled(Box)(({ theme }) => ({
   width: '1.5rem',
   height: '1.5rem',
   borderRadius: '50%',
   border: '2px solid #000000',
   marginRight: '1rem',
}));

let userDetails;
function Signup(props) {
   //console.log(props.number);
   let [namemsg, setnameMsg] = useState(''); //name error message color
   let [namecol, setNamecol] = useState('1px solid #ffba08'); // name input border color
   const [emailmsg, setemailMsg] = useState('');
   const [emailcol, setEmailcol] = useState('1px solid #ffba08');
   const [phonemsg] = useState('');
   const [phonecol] = useState('1px solid #ffba08');

   const [firstname, setFirstName] = useState(
      props.number ? props.number.fname : ''
   ); //username input field
   const [lastname, setUserlname] = useState(
      props.number ? props.number.lname : ''
   ); //username input field
   const [useremail, setUseremail] = useState(
      props.number ? props.number.email : ''
   ); //useremail input field
   const [userphone, setUserphone] = useState(
      props.number ? props.number.phone : ''
   ); //userphone input field
   const [switching, setSwitch] = useState('signup');
   let [gobj] = useState(props.number);

   function handleUser(e) {
      e.preventDefault();
      console.log('Register clicked');
      let getvalue = JSON.parse(window.localStorage.getItem('user'));

      let obj = { fname: '', lname: '', email: '', phone: '', otp: '123456' };
      let emailconfirmation = false;

      if (firstname.length >= 1 && lastname.length >= 1) {
         setnameMsg('');
         setNamecol('1px solid #ffba08');
      } else {
         namemsg = 'Please enter valid name';
         setnameMsg(namemsg);
         setNamecol('1px solid red');
      }

      if (useremail.length > 0) {
         if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(useremail)) {
            setemailMsg('');
            setEmailcol('1px solid #ffba08');
            emailconfirmation = true;
         } else {
            setemailMsg('Email invalid, please try again');
            setEmailcol('1px solid red');
         }
      } else {
         setemailMsg('');
         setEmailcol('1px solid #ffba08');
         emailconfirmation = true;
      }

      if (
         firstname.length >= 1 &&
         lastname.length > 0 &&
         userphone.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) &&
         !(userphone.match(/0{5,}/) === true) &&
         emailconfirmation
      ) {
         gobj.fname = firstname;
         gobj.lname = lastname;
         gobj.email = useremail;
         gobj.phone = userphone;

         // backend code
         userDetails = {
            first_name: firstname,
            last_name: lastname,
            email: useremail,
            mobile: userphone,
            role,
         };

         axios
            .post(`https://api-dev.solruf.com/api/register`, userDetails)
            .then(({ data }) => {
               console.log(data);
               if (data.message === 'Success') {
                  setSwitch('confirm');
               }
            })
            .catch((d) => setSwitch('same'));
      } else {
         console.log('Something went wrong!');
      }
   }

   function handleBack() {
      setSwitch('ragister');
   }

   const [role, setRole] = useState('User');
   console.log(role);

   const handleUserClick = (event) => {
      setRole('User');
   };
   const handleVendorClick = (event) => {
      setRole('Vendor');
   };

   return switching === 'signup' ? (
      <div className='signup_Ragistration'>
         <div className='form_logo'>
            <div>Sign Up | Login</div>
         </div>
         <div className='signup-message'>
            <div className='backarrow'>
               <ArrowBackIcon
                  style={{ color: 'grey', fontSize: '20px' }}
                  onClick={handleBack}
               />
            </div>
            <div className='message  signupotpmsg'>
               Enter OTP sent your{' '}
               {props.number ? props.number.phone : `Phone No`}.
            </div>
         </div>
         <form style={{ marginTop: '2rem' }}>
            <div style={{ color: 'red' }} className='errormsg'>
               {namemsg}
            </div>
            <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: {xs: 'column',sm: 'row'} }}>
               <input
                  style={{ border: `${namecol}` }}
                  className='fname'
                  type='text'
                  value={firstname}
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}
                  required
               />
               <input
                  style={{ border: `${namecol}` }}
                  className='lname'
                  type='text'
                  value={lastname}
                  placeholder='Last Name'
                  onChange={(e) => setUserlname(e.target.value)}
                  required
               />
            </Box>
            <br />
            <div style={{ color: 'red' }} className='errormsg'>
               {emailmsg}
            </div>
            <input
               style={{ border: `${emailcol}` }}
               className='email'
               onChange={(e) => setUseremail(e.target.value)}
               value={useremail}
               type='email'
               placeholder='Email(Optional)'
            />
            <br />
            <br />
            <div style={{ color: 'red' }} className='errormsg'>
               {phonemsg}
            </div>
            <input
               style={{ border: `${phonecol}` }}
               minLength='10'
               maxLength='10'
               className='phone'
               value={userphone}
               onChange={(e) => setUserphone(e.target.value)}
               type='text'
               placeholder='Phone Number'
               required
            />
            <br />
            <br />
            <Box
               sx={{
                  mb: 2,
                  mt: 1,
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Typography variant='h5' fontWeight={600}>
                  Register as{' '}
               </Typography>

               <UserTypeBox>
                  <UserBox
                     sx={{
                        background: role === 'User' ? '#ffd05b' : '#D0D7D9',
                     }}
                     onClick={handleUserClick}
                  >
                     <Circle
                        sx={{
                           background: role === 'User' ? '#000000' : '#D0D7D9',
                        }}
                     ></Circle>
                     <Text>
                        <Typography variant='h6' fontWeight={600}>
                           {' '}
                           Purchase consumer
                        </Typography>
                        <Typography variant='body2'>
                           You are here to purchase solar products.
                        </Typography>
                     </Text>
                  </UserBox>
                  <VendorBox
                     sx={{
                        background: role === 'Vendor' ? '#ffd05b' : '#D0D7D9',
                     }}
                     onClick={handleVendorClick}
                  >
                     <Circle
                        sx={{
                           background:
                              role === 'Vendor' ? '#000000' : '#D0D7D9',
                        }}
                     ></Circle>
                     <Text>
                        <Typography variant='h6' fontWeight={600}>
                           {' '}
                           Solar Installer / Vendor
                        </Typography>
                        <Typography variant='body2'>
                           You have a solar product/service company and woulkd
                           like to promote yout business along with procurement.
                        </Typography>
                     </Text>
                  </VendorBox>
               </UserTypeBox>
            </Box>
            <button className='register' onClick={handleUser} type='button'>
               Register
            </button>
            <br />
            <br />
         </form>
      </div>
   ) : switching === 'ragister' ? (
      <Checkuser number={gobj} />
   ) : (
      <Confirm number={gobj} setShowDashboard={props.setShowDashboard} />
   );
}

export default Signup;
