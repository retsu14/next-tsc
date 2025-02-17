import axios from "axios";

const instance = axios.create({
  baseURL: "https://backend-mcgt.onrender.com",
  timeout: 30000,
  withCredentials: true,
});

export default instance;
