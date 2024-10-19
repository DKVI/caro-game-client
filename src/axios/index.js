import axios from "axios";
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL
    ? process.env.BASE_URL
    : "http://localhost:8080/api/v1",
});

export default axiosInstance;
