import { AxiosResponse, } from "axios";
import { API_BASE_URL, apiRequest, mockResponse } from "../(constants)";
import { Next } from "../(definitions)";

// Define interfaces
export interface CompleteRequestParams {
    individual: Individual;
    correlationId: string;
}

export interface CompleteRequestPayload {
    individual: Individual;
    correlationId: string;
}

interface Individual {
    firstName: string;
    lastName: string;
    addresses: Address[];
    emailAddresses?: string[];
    dob?: string;
    ssn?: string;
    last4SSN?: string;
}

interface Address {
    address: string;
    city: string;
    postalCode: string;
    extendedAddress?: string;
    region: string;
}

export interface CompleteRequestResponse {
    message: string;
    success: boolean;
    next: Partial<Next>;
    changeDetected: boolean;
}

// Define mock data for testing
const MOCK_RESPONSE_DATA: CompleteRequestResponse = {
    message: 'ok',
    success: true,
    next: {
        done: null
    },
    changeDetected: false,
};

export const v3CompleteRequest = async ({
    individual,
    correlationId,
}: CompleteRequestParams): Promise<AxiosResponse<CompleteRequestResponse>> => {
    if (!API_BASE_URL) {
        return mockResponse<CompleteRequestResponse>(MOCK_RESPONSE_DATA);
    }

    const payload: CompleteRequestPayload = {
        individual,
        correlationId
    };

    return apiRequest<CompleteRequestResponse>('/v3/complete', payload, MOCK_RESPONSE_DATA);
};
