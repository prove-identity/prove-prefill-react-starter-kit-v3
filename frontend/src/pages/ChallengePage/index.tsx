import { useMemo, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Box, CircularProgress, Container, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { useForm, } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// module import 
import { NAV_HEIGHT } from '../../constants';
import { useAuth } from '../../contexts/AuthProvider';
import { useDevice } from '../../contexts/DeviceProvider';
import PhoneNumberInputField from '../../components/PhoneNumberInputField';
import ProveButton from '../../components/ProveButton';
import AuthAgreement from '../../components/AuthAgreement';
import * as proveService from '../../services/prove-service';
import FormTextInput from '../../components/FormTextInput';
import { ChallengePageData, createValidationSchema } from './(definitions)';
import { AppEnv } from '../../services/prove-service/(definitions)';

const ChallengePage: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    //Get AppEnv from Auth Context (for use in validation schema)
    const { appEnv } = useAuth(); 

    // AuthProvider
    const { setAuthToken, setCorrelationId, setNextStep } = useAuth();

    // DeviceProvider 
    const { phoneNumber, setPhoneNumber, isMobile } = useDevice();

    //Config 
    const [error, setError] = useState<string>('');

    //Setup Validation Schema for form validation (passing appEnv)
    const validateSchema = useMemo(() => createValidationSchema(appEnv as AppEnv), [appEnv]);
    
    const {
        control,
        handleSubmit,
        formState: { isDirty, isValid, isSubmitting, isLoading, },
    } = useForm<ChallengePageData>({
        mode: 'onChange',
        resolver: yupResolver(validateSchema),
        defaultValues: {
            phoneNumber: phoneNumber || '',
            last4SSN: '',
        }
    });

    const handleContinueButton = async (data: ChallengePageData) => {
        try {
            const { last4SSN, phoneNumber } = data;
            setPhoneNumber(phoneNumber);
            // Call /start endpoint here - v3StartRequest
            const response = await proveService.v3StartRequest({
                isMobile,
                phoneNumber,
                last4SSN,
                finalTargetUrl: 'http://127.0.0.1:3000/sms-result',
            });

            const { data: startResponse } = response;

            // Save authToken and correlationId in AuthProvider
            // for use in the SMSWaiting Page to avoid passing auth tokens in url
            setAuthToken(startResponse.authToken);
            setCorrelationId(startResponse.correlationId);
            setNextStep(startResponse.next);
            // redirect users to appropriate page depending on flowType ('desktop' | 'mobile')
            const smsWaitingPath = (isMobile ? '/sms-otp' : '/sms-waiting') + location.search;
            navigate(smsWaitingPath);
        } catch (err) {
            console.error('API call failed:', err);
            setError('An error occurred while processing your request. Please try again.'); // Set error message
        }
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
            {isLoading ? (
                <Box sx={{ background: "transparent", zIndex: 2147483648 }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Stack mb={1} flexGrow={1} className="fadeInSlow">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                            <Typography
                                textAlign="left"
                                component="h1"
                                variant="h4"
                                fontWeight="bold"
                                pb={1}
                            >
                                {t('challengePage.title')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography
                                textAlign="left"
                                component="h2"
                                variant="h6"
                                fontWeight="bold"
                                pb={1}
                                mb={2}
                            >
                                {t('challengePage.subTitle')}
                            </Typography>
                        </Grid>
                        {error && (
                            <Grid item xs={12}>
                                <Typography
                                    color="error"
                                    variant="body1"
                                >
                                    {error}
                                </Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} mb={2}>
                            <FormTextInput
                                control={control}
                                name="last4SSN"
                                type="numeric"
                                label={t('dataCollection.ssn.label')}
                                maxLength={4}
                                startAdornment={
                                    <InputAdornment position="start" sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                        ***  **
                                    </InputAdornment>
                                }
                            />
                            <Typography
                                fontSize="1.0rem"
                                pt={1}
                                sx={{ display: 'flex', alignItems: 'center' }}
                            >
                                {t('dataCollection.ssn.moreInfo')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sx={{ pt: 1 }}>
                            <PhoneNumberInputField
                                control={control}
                                name="phoneNumber"
                                label={t('dataCollection.phone.label')}
                            />
                        </Grid>
                    </Grid>
                </Stack>
            )}
            <Stack
                width="100%"
                justifyContent="flex-end"
                gap={1}
                pb={2}
            >
                <Grid container spacing={1}>
                    <Grid item xs={12} mb={1}>
                        <AuthAgreement />
                    </Grid>
                    <Grid item xs={12} mb={1}>
                        <ProveButton
                            size="large"
                            type="submit"
                            disabled={!isDirty || !isValid || isSubmitting}
                            onClick={handleSubmit(handleContinueButton)}
                        >
                            {isSubmitting ? "Loading..." : "Continue"}
                        </ProveButton>
                    </Grid>
                </Grid>
            </Stack>
        </Container>
    );
};

export default ChallengePage;
