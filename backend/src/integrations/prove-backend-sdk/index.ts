// ProveBackendSdk.ts
import { Proveapi } from "@prove-identity/prove-api";
import { PROVE_CLIENT_ID, PROVE_CLIENT_SECRET, } from "./(constants)";
import { ProveServerEnvs } from "../(definitions)";

class ProveBackendSdk {
    private static instance: Proveapi;

    private constructor() { }

    private static getServerEnv(): ProveServerEnvs {
        return ['prod', 'production'].includes(process.env.NODE_ENV || '') ? ProveServerEnvs.PROD : ProveServerEnvs.SANDBOX;
    }

    public static getInstance(): Proveapi {
        if (!ProveBackendSdk.instance) {
            if (!PROVE_CLIENT_ID || !PROVE_CLIENT_SECRET) {
                throw new Error('Please check SDK Credentials and try again: PROVE_CLIENT_ID, PROVE_CLIENT_SECRET');
            }
            ProveBackendSdk.instance = new Proveapi({
                server: ProveBackendSdk.getServerEnv(),
                security: {
                    clientID: PROVE_CLIENT_ID,
                    clientSecret: PROVE_CLIENT_SECRET,
                }
            });
        }

        return ProveBackendSdk.instance;
    }
}

export default ProveBackendSdk;
