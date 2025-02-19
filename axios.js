import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 30000,
  withCredentials: true,
});

export default instance;
