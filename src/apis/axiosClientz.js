import axios from "axios";
import store from "../store";

const axiosClientz = axios.create({
  baseURL: "https://jiranew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNyIsIkhldEhhblN0cmluZyI6IjIxLzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDI1OTIwMDAwMCIsIm5iZiI6MTY0NjE1NDAwMCwiZXhwIjoxNjc0NDA2ODAwfQ.5JfRY7XxLBvxphVDGE6br_uBYC9AbkqaSEmNTGvzWtQ",
  },
});

axiosClientz.interceptors.request.use((config) => {
  const { accessToken } = store.getState().auth.user || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClientz.interceptors.response.use(
  (response) => {
    return response.data.content;
  },

  (error) => {
    return Promise.reject(error.response?.data?.message);
  }
);

export default axiosClientz;
