import axios, {
  AxiosError,
  AxiosRequestHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/stores/use-auth-store";
import { ApiResponse } from "@/types/api";

// Base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = useAuthStore.getState().token;

    if (token) {
      if (!config.headers) {
        config.headers = {} as AxiosRequestHeaders;
      }
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response: AxiosResponse) => {
    const data = response.data as ApiResponse<unknown>;

    if (data.success === false) {
      const firstError = data.errors?.[0];
      const errorMessage =
        firstError?.message || data.message || "Unknown API Error";

      return Promise.reject(new Error(errorMessage));
    }

    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    if (error.code === "ECONNABORTED" && error.message.includes("timeout")) {
      return Promise.reject(
        new Error("Request timed out. The server took too long to respond.")
      );
    }

    if (error.response) {
      const status = error.response.status;

      if (status === 429) {
        return Promise.reject(
          new Error("Too many requests. Please wait a moment.")
        );
      }

      if (status === 401) {
        useAuthStore.getState().logout();
        return Promise.reject(
          new Error("Session expired. Please login again.")
        );
      }

      if (status >= 500) {
        return Promise.reject(
          new Error("Server error. Please try again later.")
        );
      }

      const serverMessage = error.response.data?.message;
      if (serverMessage) {
        return Promise.reject(new Error(serverMessage));
      }
    }

    return Promise.reject(
      new Error(error.message || "Network Error. Please check your connection.")
    );
  }
);

export default api;
