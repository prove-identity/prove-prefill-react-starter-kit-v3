//package import 
import { AxiosResponse, } from "axios";
//module import
import { API_BASE_URL, apiRequest, mapIsMobileToFlowtype, mockResponse, } from "../(constants)";
import { Flowtype, Next } from "../(definitions)";

// Define interfaces
interface StartRequestParams {
    isMobile: boolean;
    phoneNumber: string;
    last4SSN: string;
    finalTargetUrl?: string;
}

export interface StartRequestPayload {
    flowType: Flowtype;
    phoneNumber: string;
    last4SSN: string;
    finalTargetUrl?: string;
    //dob: string;
    //finalTargetUrl: https://www.example.com/landing-page
    //emailAddress: jdoe@example.com
    //phoneNumber: "12065550100"
    //last4SSN: "1234"
    //dob: 2024-05-02
    //ipAddress: 10.0.0.1
    //deviceId: 713189b8-5555-4b08-83ba-75d08780aebd
    //flowType: web
}

export interface StartRequestResponse {
    message: string;
    success: boolean;
    next: Partial<Next>;
    authToken: string;
    correlationId: string;
}

const MOCK_RESPONSE_DATA: StartRequestResponse = {
    message: 'ok',
    success: true,
    next: {
        'v3-validate': '/v3/validate',
    },
    authToken: 'eyJhbGciOi...',
    correlationId: '713189b8-5555-4b08-83ba-75d08780aebd',
}

export const v3StartRequest = async ({
    isMobile,
    phoneNumber,
    last4SSN,
}: StartRequestParams): Promise<AxiosResponse<StartRequestResponse>> => {
    if (!API_BASE_URL) {
        return mockResponse<StartRequestResponse>(MOCK_RESPONSE_DATA);
    }

    const payload: StartRequestPayload = {
        flowType: mapIsMobileToFlowtype(isMobile),
        phoneNumber,
        last4SSN,
    };

    return apiRequest<StartRequestResponse>('/v3/start', payload, MOCK_RESPONSE_DATA);
};