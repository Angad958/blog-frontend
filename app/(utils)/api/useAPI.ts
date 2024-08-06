import { useEffect, useState } from "react";
import { apiHandler } from "./APIHandler";

interface ApiResponse<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

type MapperFunction<T, U> = (data: T) => U;

const useApi = <T>(
  method: "GET" | "POST" | "PUT" | "DELETE", // API method
  url: string, // API endpoint
  mapper?: MapperFunction<any, T>, // Optional mapper function
  dependencies: any[] = [] // Optional dependencies array
): [ApiResponse<T>] => {
  const [response, setResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  useEffect(() => {
    // Api calling function
    const fetchData = async () => {
      try {
        const response = await apiHandler<any>(method, url);
        if (response.success) {
          const responseData = mapper ? mapper(response.data) : response.data;
          setResponse({ data: responseData, error: null, loading: false });
        } else {
          throw new Error("Network response was not ok");
        }
      } catch (error: any) {
        setResponse({ data: null, error: error, loading: false });
      }
    };

    fetchData();
  }, [url, ...dependencies]); // Include dependencies here

  return [response]; // Api response
};

export default useApi;
