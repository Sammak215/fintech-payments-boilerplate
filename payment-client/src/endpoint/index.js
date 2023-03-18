import axios from "axios";

let localenv = "http://localhost:3001";

// let localenv = 'https://payment-api-apps.herokuapp.com';

let prodenv = "https://payment-api-apps.herokuapp.com";

export const apiBase =
  process.env.NODE_ENV === "development" ? localenv : prodenv;

const instance = axios.create({
  baseURL: apiBase,
});

instance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) config.headers.authorization = `Bearer ${token}`;

    return config;
  },
  (err) => Promise.reject(err)
);

export default instance;
