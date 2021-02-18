import axios from 'axios';

const firebaseInstance = axios.create({
  baseURL: 'https://test-5fcf0-default-rtdb.firebaseio.com',
});

export default firebaseInstance;
