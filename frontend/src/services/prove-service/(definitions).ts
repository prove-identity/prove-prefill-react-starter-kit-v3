export interface Next {
    'v3-validate'?: string;
    'v3-challenge'?: string;
    'v3-complete'?: string;
    'done'?: string | null;
}

export enum NextKeys {
    V3_VALIDATE = 'v3-validate',
    V3_CHALLENGE = 'v3-challenge',
    V3_COMPLETE = 'v3-complete',
    DONE = 'done'
}

export const apiEndpoints = {
    [NextKeys.V3_VALIDATE]: '/v3/validate',
    [NextKeys.V3_CHALLENGE]: '/v3/challenge',
    [NextKeys.V3_COMPLETE]: '/v3/complete',
    [NextKeys.DONE]: null
};

export enum Flowtype {
    DESKTOP = 'desktop',
    MOBILE = 'mobile',
}

export enum AppEnv {
    PRODUCTION = "production",
    SANDBOX = "sandbox",
}

export enum ApiEndpoints {
    V3_VALIDATE = '/v3/validate',
    V3_CHALLENGE = '/v3/challenge',
    V3_COMPLETE = '/v3/complete',
    DONE = ''
}

export function isComplete(next: string | null) {
    if (!next) {
        return true;
    }
    return false;
}