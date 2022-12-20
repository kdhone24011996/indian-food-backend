import axios, { AxiosError } from "axios";
import { apiProvider } from "../Provider";

const UNAUTHORIZED = 401;

const instance = axios.create({
  baseURL: "http://localhost:8000",
});

// instance.interceptors.request.use(function (config) {
//   config.withCredentials = true;
//   return config;
// });

instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response) {
      const { status } = error.response;
      if (
        status === UNAUTHORIZED &&
        error.response.data.errors[0] === "jwt expired"
      ) {
        const obj = {};
        try {
          await apiProvider.post(`user/refresh`, obj);
          return instance(error.config);
        } catch (err) {
          try {
            await apiProvider.post("user/logout", {});
            window.location.reload();
          } catch (err) {
            console.log(err);
          }
        }
      }
      return Promise.reject(error);
    }
  }
);
export { instance };
