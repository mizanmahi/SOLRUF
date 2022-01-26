import axios from 'axios';

const headers = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
};

console.log(localStorage.getItem('user'));

if (localStorage.getItem('user') !== null) {
   const token = JSON.parse(localStorage.getItem('user'))?.token;
   console.log(token);
   headers.authorization = `Bearer ${token}`;
}

const baseURL = 'https://api-dev.solruf.com/';
// const baseURL = 'http://localhost:5000'

//@ creating a axios instance with some basic configuration
export const axiosInstance = axios.create({
   baseURL,
});

//@ axios instance with auth token
export const axiAuth = axios.create({
   baseURL,
   headers,
});
