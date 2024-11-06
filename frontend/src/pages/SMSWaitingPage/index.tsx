// package import 
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, CircularProgress, Container, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as proveAuth from "@prove-identity/prove-auth";
import PhoneNumberInput from "@prove-identity/prove-auth/build/lib/proveauth/internal/phone-number-input";
//module import 
import { useAuth } from '../../contexts/AuthProvider';
import { useDevice } from '../../contexts/DeviceProvider';
import ProveClientSdk from "../../services/prove-client-sdk";
import * as proveService from '../../services/prove-service';
import { API_BASE_URL } from '../../services/prove-service/(constants)';

const SMSWaitingPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    //Get Auth Token from context
    const { authToken, correlationId, setNextStep, setAuthToken } = useAuth();

    //Get Phone number from context (Set in ChallengePage)
    const { phoneNumber } = useDevice();

    //Auth Ref 
    const authRef = useRef<proveAuth.CancelablePromise<void> | null>(null);

    // Config 
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!authToken) {
            navigate('/challenge');
        }
        //send instant-link on component mount 
        sendInstantLink(authToken as string);

        //on component unmount, clear the authToken and cancel the websocket (if not successful)
        return () => {
            setAuthToken('');
            if (authRef.current) {
                authRef.current.cancel();
            }
        }
    }, [authToken]);

    const sendInstantLink = async (
        authToken: string
    ) => {
        try {
            //if API_BASE_URL is set in .env, then call real endpoint
            if (API_BASE_URL) {
                const proveClientSdk = new ProveClientSdk();
                const builder = proveClientSdk.handleInstantLink(
                    instantLinkStartStep,
                    authFinishStep
                );
                //set ref to builder instance to clear on unmount 
                authRef.current = builder.authenticate(authToken);
                await authRef.current;
            } else {
                //local mock mode (simulate succesful instant-link auth finish)
                setTimeout(() => {
                    authFinishStep({
                        authId: ''
                    })
                }, 3000);
            }
        } catch (e) {
            console.log('error: ', e);
        } finally {
            setLoading(false);
        }
    }

    const instantLinkStartStep: proveAuth.InstantLinkStartStep = {
        execute: (phoneNumberNeeded: boolean, phoneValidationError?: proveAuth.PhoneValidationError
        ): Promise<PhoneNumberInput | null> => {
            return new Promise((resolve, reject) => {
                if (phoneNumberNeeded) {
                    if (phoneValidationError) {
                        // Handle validation error if needed
                        alert(`Validation Error: ${phoneValidationError.message}`);
                        reject(new Error(`Validation Error: ${phoneValidationError.message}`));
                    }

                    // Resolve the phone number input
                    resolve({ phoneNumber: phoneNumber });
                } else {
                    // Phone number not needed, resolve with null
                    resolve(null);
                }
                setLoading(false);
            });
        }
    }

    const authFinishStep: proveAuth.AuthFinishStepFn = async (
        input: proveAuth.AuthFinishStepInput
    ): Promise<any> => {
        //On successful authFinish, call /v3ValidateRequest 
        try {
            const response = await proveService.v3ValidateRequest({
                correlationId: correlationId as string
            });
            if (response.data) {
                const { next, success, challengeMissing, } = response.data;
                setNextStep(next);
                return navigate('/review' + location.search);
            }
        } catch (e: any) {
            console.log('error: ', e);
        }
    }

    //Redirects users back to challenge page 
    const handleReturnToChallengePage = async () => {
        // Construct new path with existing query parameters
        const challengePagePath = '/challenge' + location.search;
        navigate(challengePagePath);
    }

    // Utility function to format phone number
    const formatPhoneNumber = (phoneNumber: string) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return match[4];
        }
    };

    return (
        <Container sx={{ pb: 2, height: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
            {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" flexDirection={"column"} pt={4} sx={{ background: "transparent", zIndex: 2147483648 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack gap={2} sx={{ animation: '0.4s fadeIn forwards' }}>
                    <Typography
                        textAlign="left"
                        component="h1"
                        variant="h4"
                        fontWeight="bold"
                    >
                        {t('smsWaiting.title')}
                    </Typography>
                    <Typography
                        textAlign="left"
                        component="h2"
                        variant="h6"
                        fontWeight="bold"
                        pb={1}
                        mb={1}
                    >
                        {t('smsWaiting.subTitle')}
                        <span style={{ display: 'inline-block' }}>
                            {formatPhoneNumber(phoneNumber)}
                        </span>
                    </Typography>
                    <Stack
                        alignItems="center"
                        gap={.1}
                    >
                        <img
                            className="fadeIn"
                            width={80}
                            height={80}
                            src={`/img/phoneImage.jpg`}
                            alt="Phone Image"
                            style={{ marginBottom: '8px', borderRadius: '32px' }}
                        />
                        <Typography
                            variant="body1"
                        >
                            {t('smsWaiting.didNotRecieve')}
                        </Typography>
                        <Button
                            sx={{ textTransform: "none" }}
                            disabled={false}
                            onClick={handleReturnToChallengePage}
                        >
                            <Typography
                                variant="body1"
                            >
                                {t('smsWaiting.returnToChallenge')}
                            </Typography>
                        </Button>
                    </Stack>
                </Stack>
            )}
        </Container>
    )
}

export default SMSWaitingPage;