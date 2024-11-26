import ProveClientSdk from '../prove-client-sdk'

class AuthService {
    constructor() { }

    // handleInstantLink(rsp: SignInResult): Promise<void> {
    //     // call proveAuthManager.waitForAuth to start listening for the user response on the mobile device
    //     // handle authFinish callback here to update session and display appropriate UI message
    //     return proveAuthManager.waitForAuth(rsp.proveAuth?.authToken!, (authResult: AuthFinishResponse & SignInResult): (void) => {
    //         log.debug("handling waitForAuth callback: ", authResult)
    //         if (authResult.subjects.mobile?.success) {
    //             // Reset auth token to prevent device registration attempt since it's not supported at the moment.
    //             rsp.proveAuth!.authToken = ""
    //             // Mobile Auth or Instant Link have successfully completed
    //             this.onSignIn(rsp)
    //         } else {
    //             const message = authResult.subjects.mobile?.error?.message ?? "Authentication via Instant Link failed"
    //             // server couldn't successfully run Mobile Auth or Instant Link
    //             this.updateSession((s) => ({
    //                 ...s,
    //                 error: message,
    //                 nextAction: undefined
    //             }))
    //         }
    //         if (authResult.authId) {
    //             this.updateSession((s) => ({ ...s, nextAction: this.populateAuthFinish(authResult) }))
    //         }
    //     }, this.instantLinkStartStep)
    // }

    // readonly instantLinkStartStep: proveAuth.InstantLinkStartStep = {
    //     execute: async (phoneNumberNeeded: boolean, phoneValidationError?: proveAuth.PhoneValidationError) => {
    //         return new Promise<proveAuth.InstantLinkStartInput | null>((resolve, reject) => {
    //             if (phoneNumberNeeded) {
    //                 var startStepMessage = phoneValidationError ?
    //                     "Phone number is invalid. Try re-entering the phone number" :
    //                     "Enter phone number to receive Instant Link";
    //                 this.instantLinkStartStepHandler(startStepMessage)
    //                     .then(resolve)
    //                     .catch(reject);
    //             } else {
    //                 // If phoneNumberNeeded is false, return null
    //                 resolve(null);
    //             }
    //         });
    //     }
    // };
}