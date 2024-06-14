// package import 
import * as proveAuth from "@prove-identity/prove-auth";
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Grid, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import PhoneNumberInput from "@prove-identity/prove-auth/build/lib/proveauth/internal/phone-number-input";
// module import 
import { NAV_HEIGHT } from '../../constants';
import ProveButton from '../../components/ProveButton';
import { useDevice } from "../../contexts/DeviceProvider";
import ProveClientSdk from "../../services/prove-client-sdk";
import { useAuth } from "../../contexts/AuthProvider";
import * as proveService from '../../services/prove-service';
import { API_BASE_URL } from "../../services/prove-service/(constants)";

const OTP_LENGTH = 4;
const BLANK_OTP = Array(OTP_LENGTH).fill("");

const OtpEntry = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    //Get Phone number from context (Set in ChallengePage)
    const { phoneNumber } = useDevice();
    //Get Auth Token from context
    const { authToken, correlationId, setNextStep, setAuthToken } = useAuth();

    // Button Refs 
    const verifyButtonRef = useRef<HTMLButtonElement | null>(null);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    //Auth Refs 
    const authRef = useRef<proveAuth.CancelablePromise<void> | null>(null);

    // Config 
    const [loading, setLoading] = useState<boolean>(false);
    const [isVerifyButtonEnabled, setIsVerifyButtonEnabled] = useState(false);
    const [isErrorFlg, setIsErrorFlg] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // OTP 
    const [otp, setOtp] = useState<string[]>(BLANK_OTP);
    const [otpSent, setOtpSent] = useState(false);
    const [otpActions, setOtpActions] = useState<{
        submitOtp: ((otp: string) => void) | null;
        cancelOtpFinish: (() => void) | null;
    }>({
        submitOtp: null,
        cancelOtpFinish: null,
    });

    useEffect(() => {
        if (!authToken) {
            //user needs to start from beginning
            return navigate('/challenge');
        }
        resetFields();
        sendOTP();

        //on component unmount, clear the authToken 
        return () => {
            setAuthToken('');
            handleCancelOtp(); 
            if(authRef.current) {
                authRef.current.cancel(); 
            }
        }
    }, []);

    const resetFields = () => {
        setErrorMsg('');
        setOtp(BLANK_OTP);
        clearOtpActions();
    }

    const sendOTP = async () => {
        try {
            if (API_BASE_URL) {
                const proveClient = new ProveClientSdk();
                // otpStartStep and otpFinishStep are called back to back. authFinishStep upon submitOtp callback
                const builder = proveClient.handleOtp(otpStartStep, otpFinishStep, authFinishStep);
                authRef.current = builder.authenticate(authToken as string);
                await authRef.current; 
            } else {
                setOtpSent(true);
            }
        } catch (e: any) {
            setIsErrorFlg(true);
            setErrorMsg(`Error: ${e.message}`);
        } finally {
            setLoading(false);
        }
    }

    const handleVerifyOTP = () => {
        if (API_BASE_URL) {
            console.log("OTP verification started");
            const enteredOtp = otp.join("");
            try {
                handleOtpSubmit(enteredOtp);
            } catch (e: any) {
                console.log("Error: handleVerifyOTP", e);
                setErrorMsg("Something went wrong, please try again later.");
            }
        } else {
            authFinishStep({
                authId: ""
            })
        }
    };

    const otpStartStep: proveAuth.OtpStartStepFn = async (
        phoneNumberNeeded: boolean,
        phoneValidationError?: proveAuth.PhoneValidationError
    ): Promise<PhoneNumberInput | null> => {
        return new Promise((resolve, reject) => {
            try {
                if (phoneNumberNeeded) {
                    if (phoneValidationError) {
                        reject(new Error(`Validation Error: ${phoneValidationError.message}`));
                        return;
                    }
                    resolve({ phoneNumber: phoneNumber });
                } else {
                    resolve(null);
                }
            } catch (e) {
                console.log('Error: otpStartStep', e);
                reject(e);
            }
        });
    }

    const otpFinishStep: proveAuth.OtpFinishStepFn  = async (
        otpError: proveAuth.OtpError | undefined
    ): Promise<proveAuth.OtpFinishResult> => {
        return new Promise(async (resolve, reject) => {
            try {
                const message = otpError ? "OTP is invalid. Try re-entering the OTP" : "Enter the SMS OTP";
                if (!otpError) {
                  setOtpSent(true);
                } else {
                  setErrorMsg(message);
                }
                
                const result = await otpFinishStepHandler(message)
                resolve(result);
            } catch(e: any) {
                console.log('error: otpFinishStep', e);
                reject(e); 
            }
        });
    };

    const otpFinishStepHandler = (
        otpMessageToUI: string
    ): Promise<proveAuth.OtpFinishResult> => {
        return new Promise<proveAuth.OtpFinishResult>((resolve, reject) => {
            console.log('otpMessageToUI: ', otpMessageToUI);

            const submitOtp = (otp: string) => {
                let input: proveAuth.OtpFinishInput = {
                    otp: otp ?? ''
                }
                let result: proveAuth.OtpFinishResult = {
                    input: input,
                    resultType: proveAuth.OtpFinishResultType.OnSuccess
                }
                resolve(result);
            };

            const cancelOtpFinish = () => {
                reject(new Error("User has canceled OTP flow"));
            };

            setOtpActions({ submitOtp, cancelOtpFinish });
        });
    };

    const authFinishStep: proveAuth.AuthFinishStepFn = async (
        input: proveAuth.AuthFinishStepInput
    ): Promise<any> => {
        //On successful authFinish, call /v3ValidateRequest 
        try {
            const response = await proveService.v3ValidateRequest({
                correlationId: correlationId as string
            });
            if (response.data) {
                //TODO: get criteria for failure or escalation 
                const { next, } = response.data;
                if (Object.keys(next).length) {
                    setNextStep(next);
                    return navigate('/review' + location.search);
                }
            }
        } catch (e: any) {
            console.log('error: ', e);
            throw e;
        }
    }

    const handleOtpSubmit = (otp: string) => {
        if (otpActions.submitOtp) {
            try {
                const result = otpActions.submitOtp(otp);
                console.log('OTP Finish Successful', result);
                return result; 
            } catch (e: any) {
                setErrorMsg(e.message);
                console.error('OTP Finish Failed', e);
            }
        }
    };

    const handleCancelOtp = () => {
        if (otpActions.cancelOtpFinish) {
            otpActions.cancelOtpFinish();
        }
    };

    const clearOtpActions = () => {
        setOtpActions({ submitOtp: null, cancelOtpFinish: null });
    }

    const handleOtpChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number
    ) => {
        const value = e.target.value;
        const numericValue = value.replace(/\D/g, "");
        const updatedOtp = [...otp];
        updatedOtp[index] = numericValue;

        setOtp(updatedOtp);

        // Move focus to the next input field if available
        if (index < OTP_LENGTH - 1 && numericValue) {
            const nextInput = inputRefs.current[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
        const isFilled = updatedOtp.every((value) => value !== "");
        setIsVerifyButtonEnabled(isFilled);
        if (isFilled && verifyButtonRef.current) {
            setErrorMsg(null);
            verifyButtonRef.current.focus();
        }
    };

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLDivElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && index > 0) {
            e.preventDefault();
            const updatedOtp = [...otp];

            // Clear the current input
            updatedOtp[index] = "";

            // Set focus to the previous input
            setOtp(updatedOtp);
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
                prevInput.focus();
            }
        } else if (e.key === "Enter" && isVerifyButtonEnabled) {
            if ([...otp].join("").length < 6) {
                setErrorMsg("OTP should be a minimum of 6 characters!");
                return;
            } else {
                handleVerifyOTP();
            }
        }
    };

    //handle pasting codes into OTP field
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('Text').trim();
        if (pasteData.length === OTP_LENGTH && /^\d+$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            setOtp(newOtp);
            setIsVerifyButtonEnabled(true);
            verifyButtonRef.current?.focus();
        }
        e.preventDefault();
    };

    return (
        <Container
            className="fadeIn"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                height: `calc(100% - ${NAV_HEIGHT})`
            }}>
            {loading ? (
                <Box display="flex" alignItems="center" justifyContent="center" pt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack mb={1} flexGrow={1} className="fadeInSlow">
                    <Grid container spacing={1}>
                        {otpSent ? (
                            <>
                                <Grid item xs={12} mb={2}>
                                    <Typography
                                        textAlign="left"
                                        component="h2"
                                        variant="h6"
                                        fontWeight="bold"
                                        pb={1}
                                        mb={2}
                                    >
                                        {t('otpEntry.title')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} mb={3} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {otp.map((value, index) => (
                                        <TextField
                                            key={index}
                                            type="tel"
                                            value={value}
                                            inputRef={(el) => (inputRefs.current[index] = el)}
                                            onChange={(e) => handleOtpChange(e, index)}
                                            onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                            onPaste={handlePaste}
                                            inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                                            InputProps={{ disableUnderline: true }}
                                            sx={{
                                                width: '4rem',
                                                height: '4rem',
                                                fontSize: '1.75rem',
                                                marginRight: '0.5rem',
                                                '&.Mui-focused': {
                                                    borderColor: 'primary.main',
                                                },
                                                '& input': {
                                                    color: 'text.primary',
                                                },
                                                backgroundColor: 'background.paper',
                                            }}
                                        />
                                    ))}
                                </Grid>
                                <Grid item xs={12}>
                                    {errorMsg && (
                                        <Box mt={2}>
                                            <Typography color="error" textAlign="center">
                                                {errorMsg}
                                            </Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </>
                        ) : (
                            <Box display="flex" justifyContent="center" alignItems="center" flexGrow={1}>
                                <Box display="flex" gap={2} alignItems="center" flexWrap="wrap">
                                    {!isErrorFlg ? (
                                        <Box>
                                            <CircularProgress size={80} />
                                            <Box mt={2}>
                                                <Typography variant="body1" textAlign="center">
                                                    {t('otpEntry.sendingOtp')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box>
                                            <CircularProgress color="error" size={80} />
                                            <Box mt={2}>
                                                <Typography variant="body1" textAlign="center" color="error">
                                                    {t('otpEntry.failureSendingOtp')}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Grid>
                    <Box sx={{ mt: 'auto', width: '100%' }}>
                        <ProveButton
                            size="large"
                            disabled={!isVerifyButtonEnabled}
                            onClick={handleVerifyOTP}
                            sx={{ width: '100%' }}
                        >
                            {t('otpEntry.continueButton')}
                        </ProveButton>
                    </Box>
                </Stack>
            )}
        </Container>
    );
};

export default OtpEntry;
