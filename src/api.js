const axios = require("axios");

const api = axios.create({
  baseURL: process.env.PRODURL || "http://127.0.0.1:3333"
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("centraleito-token");
  if (token) {
    config.headers["x-access-token"] = token;
  }
  return config;
});

export default api;
