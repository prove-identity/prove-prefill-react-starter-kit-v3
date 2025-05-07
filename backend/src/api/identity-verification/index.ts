//package import 
import { Router } from 'express';
//module import 
import {
    getEchoEndpoint,
    v3ChallengeRequest,
    v3CompleteRequest,
    v3StartRequest,
    v3ValidateRequest
} from '@src/api/identity-verification/(controller)';

const router = Router({ mergeParams: true });

router.get('/echo', getEchoEndpoint);
router.use('/start', v3StartRequest);
router.use('/validate', v3ValidateRequest);
router.use('/challenge', v3ChallengeRequest);
router.use('/complete', v3CompleteRequest);

export default router; 