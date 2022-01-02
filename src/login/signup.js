import React, { useState } from 'react';
import Confirm from './signup_conf';
import Checkuser from './checkuser';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import domainName from '../domain/domainname.json';

//let gobj={};
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
         };

         axios
            .post(`https://api-dev.solruf.com/api/register`, userDetails)
            .then(({ data }) => {
               console.log(data);
               if (data.message === 'success') {
                  setSwitch('confirm');
               }
            })
            .catch((d) => setSwitch('same'));
      }else {
          console.log('Something went wrong!');
      }
   }

   function handleBack() {
      setSwitch('ragister');
   }

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
         <form style={{marginTop: '2rem'}}>
            <div style={{ color: 'red' }} className='errormsg'>
               {namemsg}
            </div>
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
            <br />
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
      <Confirm number={gobj} setShowDashboard={props.setShowDashboard}/>
   );
}

export default Signup;
