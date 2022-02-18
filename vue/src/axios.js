/**
 * Created by Zura on 12/25/2021.
 */
// import axios
import axios from "axios";
// import store
import store from "./store";
// import router
import router from "./router";

// กำหนด baseUrl ของ api เช่น http://locahost:8000/api
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})
// กำหนด config header ของ user ให้ค่า token ของ user เป็น Bearer token
axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`
  return config;
})
// กำหนด error redirect
axiosClient.interceptors.response.use(response => {
  // ให้ return response กลับไปปกติ
  return response;
  // แต่ถ้ามี error
}, error => {
  // ถ้า status = 401
  if (error.response.status === 401) {
    // ล้าง session Storage TOKEN
    sessionStorage.removeItem('TOKEN')
    // กำหนด router ไปที่ login
    router.push({name: 'Login'})
    // ถ้า 404
  } else if (error.response.status === 404) {
    // กำหนด router ไปที่ NotFound
    router.push({name: 'NotFound'})
  }
  // throw error
  throw error;
})

export default axiosClient;
