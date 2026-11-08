import axios from 'axios';

const request = axios.create({
  baseURL: '/api',  // 后端地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default request;