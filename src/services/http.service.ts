import axios from "axios";
import { getAuth } from "./auth.service";

// Request interceptor for API calls
axios.interceptors.request.use(
  async (config) => {
    const authToken = getAuth();
    config.headers = {
      Authorization: authToken?.accessToken,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const access_token = await refreshAccessToken();
      console.log("refreshing access token");
      const access_token = "hry";
      axios.defaults.headers.common["Authorization"] = access_token;
      return axios(originalRequest);
    }
    return Promise.reject(error);
  }
);

// axios.interceptors.response.use(null, (error) => {
//   const config = error.config;
//   if (error.response.status === 400) {
//     return new Promise((resolve) => {
//       resolve(axios(config));
//     });
//   }
//   return Promise.reject(error);
// });

const httpService = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  patch: axios.patch,
};

export default httpService;
