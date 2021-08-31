import axios from 'axios';

const api = axios.create({
  baseURL: 'https://zq7fojw450.execute-api.us-east-2.amazonaws.com'
})

export default api;
