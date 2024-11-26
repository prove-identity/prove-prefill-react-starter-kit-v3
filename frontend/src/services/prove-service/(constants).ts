//package import 
import axios, { AxiosResponse, } from "axios";
//module import 
import { sleep } from "../../util/helpers";
import { Flowtype } from "./(definitions)";

export const API_BASE_URL = import.meta.env.REACT_APP_BASE_API_URL;

export const DEFAULT_REQUEST_HEADERS = {
    "Content-Type": "application/json",
    Accept: "application/json",
};

// Generic mock response function for testing purposes
export const mockResponse = async <T,>(mockData: T,): Promise<AxiosResponse<T>> => {
    await sleep(3);
    return {
        data: mockData,
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as any,
    };
};

// Generic API request function 
export const apiRequest = async <T,>(
    endpoint: string,
    payload: Record<string, any>,
    mockData: T,
): Promise<AxiosResponse<T>> => {
    if (!API_BASE_URL) {
        return mockResponse<T>(mockData);
    }

    try {
        return await axios.post(
            `${API_BASE_URL}${endpoint}`,
            payload,
            {
                headers: {
                    ...DEFAULT_REQUEST_HEADERS,
                },
            }
        );
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios errors
            console.error("Axios error:", error.message);
            return Promise.reject(error.response);
        } else {
            // Handle non-Axios errors
            console.error("Unexpected error:", error);
            return Promise.reject(error);
        }
    }
};

export const mapIsMobileToFlowtype = (isMobile: boolean): Flowtype => {
    return isMobile ? Flowtype.MOBILE : Flowtype.DESKTOP;
};