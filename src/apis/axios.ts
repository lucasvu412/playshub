import axios from "axios";
import { refreshToken } from "./account/refreshToken";
import { getJwtToken, setJwtToken } from "../utils/storage";

const api = axios.create({
  baseURL: import.meta.env.VITE_PLAY_HUBS_API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Assume you have a function to refresh the token
      const newToken = await refreshToken();
      setJwtToken(newToken);

      axios.defaults.headers.common["Authorization"] = "Bearer " + newToken;
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default api;
