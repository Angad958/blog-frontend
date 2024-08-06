import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import Cookies from "js-cookie";
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  error?: any;
}

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL as string, // Change this to your API base URL
  timeout: 10000, // Adjust the timeout as needed
  withCredentials: true, // Ensure cookies are sent with requests
});

instance.interceptors.request.use(
  (config: AxiosRequestConfig | any) => {
    const accessToken = Cookies.get("idToken"); // Use cookies to get the idToken
    // If a token is found, add it to the request headers
    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    return Promise.reject(error?.response?.data);
  }
);

export const apiHandler = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  data?: any
): Promise<ApiResponse<T>> => {
  try {
    const response: AxiosResponse<T> = await instance.request<T>({
      method,
      url,
      data,
    });
    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      success: false,
      message: axiosError?.message,
      error: axiosError,
    };
  }
};
