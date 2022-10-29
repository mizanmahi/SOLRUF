import axios from 'axios';

let token = localStorage.getItem('token');

const headers = {
   'Content-Type': 'application/json',
   Accept: 'application/json',
   Authorization: `Bearer ${token}`,
};

// const formDataHeaders = {
//   'Content-Type': 'multipart/form-data',
// };

const baseURL = 'https://api-dev.solruf.com/';
// const baseURL = 'http://localhost:5000'

//* creating a axios instance with some basic configuration
export const axiosInstance = axios.create({
   baseURL,
});

//* axios instance with auth token
export const axiAuth = axios.create({
   baseURL,
   headers,
   ...headers,
});

// export const nodeURL = 'http://localhost:3006/';
export const nodeURL = 'https://links.solruf.com/';
