import axios from 'axios';

const headers = {};

if (localStorage.getItem('idToken')) {
   const token = JSON.parse(localStorage.getItem('user')).token;
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
