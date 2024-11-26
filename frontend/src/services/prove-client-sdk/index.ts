//package import 
import * as proveAuth from "@prove-identity/prove-auth";

export default class ProveClientSdk {
    private readonly defaultAuthenticator: proveAuth.Authenticator;

    constructor(authenticatorBuilder: proveAuth.AuthenticatorBuilder = new proveAuth.AuthenticatorBuilder()) {
        this.defaultAuthenticator = authenticatorBuilder.build();
    }

    authCheck(): boolean {
        return this.defaultAuthenticator.isMobileWeb();
    }

    handleOtp(
        otpStartStep: proveAuth.OtpStartStep | proveAuth.OtpStartStepFn,
        otpFinishStep: proveAuth.OtpFinishStepFn,
        authFinishStep: proveAuth.AuthFinishStepFn,
    ): proveAuth.Authenticator {
        const authenticator = new proveAuth.AuthenticatorBuilder()
            .withAuthFinishStep(authFinishStep)
            .withMobileAuthImplementation(proveAuth.MobileAuthImplementation.Fetch)
            .withOtpFallback(otpStartStep, otpFinishStep)
            .build();

        return authenticator;
    }

    handleInstantLink(
        instantLinkStartStep: proveAuth.InstantLinkStartStep | proveAuth.InstantLinkStartStepFn,
        authFinishStep: proveAuth.AuthFinishStepFn,
    ): proveAuth.Authenticator {
        const authenticator = new proveAuth.AuthenticatorBuilder()
            .withRole(proveAuth.DeviceRole.Secondary)
            .withInstantLinkFallback(instantLinkStartStep)
            .withAuthFinishStep(authFinishStep)
            .build();

        return authenticator;
    }
}