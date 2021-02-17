import axios from 'axios';

// Default configs for axios
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers['Authorization'] = 'AUTH_TOKEN';
axios.defaults.headers['clgt'] = 'vcc';
axios.defaults.headers['Content-Type'] = 'application/json';

axios.interceptors.request.use(
  request => {
    console.log(request);
    return request;
  },
  error => {
    // Log any request error to the server for example
    console.log(error);
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  response => {
    console.log(response);
    return response;
  },
  error => {
    // Log any response error to the server for example
    console.log(error);
    return Promise.reject(error);
  },
);

// Instance
export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});
axiosInstance.defaults.headers['Content-Type'] = 'application/json';
axiosInstance.defaults.headers['hihi'] = 'haha';
axiosInstance.interceptors.request.use(resquest => {
  console.log(resquest);
  return resquest;
});
