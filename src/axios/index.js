import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://game-caro-api.vercel.app/api/v1",
});

export default axiosInstance;
