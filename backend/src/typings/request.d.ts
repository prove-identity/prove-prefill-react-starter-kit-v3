import PrefillWithoutMnoConsent from "@src/models/prefill-without-mno-consent";
import RequestDetail from "@src/models/request-detail";
import ResponseDetail from "@src/models/response-detail";

//packge import 
export { };

declare global {
    namespace Express {
        interface Request {
            prefillRecordId: number;
            isMobile?: boolean; 
            prefillRecord?: PrefillWithoutMnoConsent;
            requestDetail: RequestDetail;
            responseDetails: ResponseDetail;
        }
    }
}