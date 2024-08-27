import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3001', // 서버의 주소와 포트
});

export default instance;
