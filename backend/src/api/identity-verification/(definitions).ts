export interface V3ChallengeResponse {
    next: Next;
    individual: Individual;
    success: boolean;
}

interface Individual {
    firstName: string;
    lastName: string;
    addresses: Address[];
    emailAddresses: string[];
    dob: string;
    ssn: string;
}

interface Address {
    address: string;
    city: string;
    postalCode: string;
    extendedAddress: string;
    region: string;
}

interface Next {
    'v3-validate': '/v3/validate';
    'v3-challenge': '/v3/challenge';
    "v3-complete": "/v3/complete";
    'done': null;
}