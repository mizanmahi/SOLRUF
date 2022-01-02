import React, { useEffect, useState } from 'react';
import Signup from './signup';
import Login from './login';
import './styles.css';
import axios from 'axios';
import domainName from '../domain/domainname.json';
import { useLocalStorage } from '../hooks/useLocalStorage';

let gobj = { fname: '', lname: '', email: '', phone: '' };

function Checkuser(props) {
   const [number, setNumber] = useState(props.number ? props.number.phone : '');
   const [msg, setMessage] = useState('');
   const [switching, setSwitch] = useState('check');

   const [borderColor, setBorderColor] = useState({
      border: '1px solid #ffba08',
   });

   function signUp(e) {
      window.localStorage.setItem('user', JSON.stringify(user));
      e.preventDefault();

      if (
         number.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) &&
         !number.match(/0{5,}/) === true
      ) {
         setBorderColor({
            borderColor: '#ffba08 #ffba08 #ffba08 #ffba08',
            borderStyle: 'solid solid solid solid',
            borderWidth: '1px 1px 1px 1px',
         });
         setMessage('');
         gobj['phone'] = number;

         // backend code verification
         axios
            .post(`https://api-dev.solruf.com/api/login`, {
               mobile: number,
            })
            .then((d) => setSwitch('login'))
            .catch((d) => setSwitch('signup'));
      } else {
         setBorderColor({
            borderColor: 'red #ffba08 red red',
            borderStyle: 'solid solid solid solid',
            borderWidth: '1px 1px 1px 1px',
         });
         setMessage('Phone number invalid, please try agin');
      }

      if (
         number.match(/^(\+\d{1,3}[- ]?)?\d{10}$/) &&
         !number.match(/0{5,}/) === true
      ) {
         let getvalue = JSON.parse(window.localStorage.getItem('user'));
         console.log(getvalue);
      }
   }

   const [user, setUser] = useLocalStorage('user', null);

   return switching === 'check' ? (<div className='mobile_Container'>
   <div className='form_logo'>
      <div>Sign Up | Login</div>
   </div>
   <form className='ragister_form'>
      <div style={{ color: 'red' }} className='errormsg'>
         {msg}
      </div>
      <div className='ragisterInputButton'>
         <input
            style={borderColor}
            className='mobilenob'
            type='text'
            minLength='10'
            maxLength='10'
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder='Phone Number'
         />
         <button type='submit' onClick={signUp} id='signup'>
            Join Solruf
         </button>
      </div>
   </form>
</div>) : switching === 'signup' ? (
      <Signup number={gobj} setShowDashboard={props.setShowDashboard} />
   ) : (
      <Login number={gobj} setUser={setUser} setShowDashboard={props.setShowDashboard} />
   );
}

export default Checkuser;
