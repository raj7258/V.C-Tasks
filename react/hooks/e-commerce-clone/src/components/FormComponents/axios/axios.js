import axios from "axios";

export const axiosInstance = (config) => {
  let { url, method, data } = config;
  let Instance = axios.create({
    baseURL: `http://localhost:3000/user${url}`,
    method: method,
    data,
  });
  return Instance;
};
