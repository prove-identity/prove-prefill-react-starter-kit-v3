//package import 
import { AxiosResponse, } from "axios";
//module import 
import { API_BASE_URL, apiRequest, mockResponse, } from "../(constants)";
import { Next } from "../(definitions)";

//Define interfaces
export interface ValidateRequestParams {
    correlationId: string;
}

export interface ValidateRequestPayload {
    correlationId: string;
}

export interface ValidateRequestResponse {
    message: string;
    success: boolean;
    next: Partial<Next>;
    challengeMissing: boolean;
}

const MOCK_RESPONSE_DATA: ValidateRequestResponse = {
    message: 'ok',
    success: true,
    next: {
        'v3-challenge': '/v3/challenge',
    },
    challengeMissing: true
}

export const v3ValidateRequest = async ({
    correlationId
}: ValidateRequestParams): Promise<AxiosResponse<ValidateRequestResponse>> => {
    if (!API_BASE_URL) {
        return mockResponse<ValidateRequestResponse>(MOCK_RESPONSE_DATA);
    }

    // Create payload
    const payload: ValidateRequestPayload = { correlationId };

    return apiRequest<ValidateRequestResponse>('/v3/validate', payload, MOCK_RESPONSE_DATA);
};