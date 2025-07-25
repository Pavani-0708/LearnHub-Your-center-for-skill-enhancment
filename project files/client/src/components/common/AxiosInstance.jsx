import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8003', // must match backend port
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;