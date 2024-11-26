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

router.post('/token');
router.get('/echo', getEchoEndpoint);
router.post('/start', v3StartRequest);
router.post('/validate', v3ValidateRequest);
router.post('/challenge', v3ChallengeRequest);
router.post('/complete', v3CompleteRequest);

export default router; 