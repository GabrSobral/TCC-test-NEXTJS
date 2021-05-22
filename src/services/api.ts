import axios from 'axios'
import { getServerSideCookies, getToken } from './auth'

export const api = axios.create({
  baseURL: "http://192.168.15.4:3333"
})

// api.interceptors.request.use(async config => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });


