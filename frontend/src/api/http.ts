import axios, { AxiosRequestConfig } from "axios";
import { removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999";
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        timeout: DEFAULT_TIMEOUT,
        headers: {
            "Content-Type": "application/json",
        },
        withCredentials: true, // ★ 쿠키 자동 포함
        ...config,
    });

    // ★★★★★ Request Interceptor – Authorization 추가 ★★★★★
    axiosInstance.interceptors.request.use(
        (config) => {
            const token = localStorage.getItem("token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Response Interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) {
                removeToken();
                window.location.href = "/login";
                return;
            }
            return Promise.reject(error);
        }
    );

    return axiosInstance;
};

export const httpClient = createClient();
