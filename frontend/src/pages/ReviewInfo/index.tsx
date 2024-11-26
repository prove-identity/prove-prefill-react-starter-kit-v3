// package import 
import { useEffect, useState } from 'react';
import moment, { Moment } from "moment";
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Container, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm, } from 'react-hook-form';
// module import 
import ProveButton from '../../components/ProveButton';
import AddressInput from '../../components/AddressInput';
import DOBInputField from '../../components/DOBInputField';
import FormTextInput from '../../components/FormTextInput';
import { useAuth } from '../../contexts/AuthProvider';
import { ApiEndpoints, } from '../../services/prove-service/(definitions)';
import * as proveService from '../../services/prove-service';
import { CompleteRequestResponse } from '../../services/prove-service/apis/completeRequest';

const validateSchema = yup.object().shape({
    address: yup.string().required('Address is required'),
    extendedAddress: yup.string(),
    city: yup.string().required('City is required'),
    region: yup.string().required('Region is required'),
    postalCode: yup.string()
        .matches(/^\d{5}(-\d{4})?$/, 'Must be a valid 5-digit or ZIP+4 postal code')
        .required('Postal Code is required'),
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    dob: yup.string().nullable(),
    ssn: yup.string()
        .matches(/^\d{9}$/, 'Must be exactly 9 digits')
        .required('SSN is required')
        .max(9, 'Must be exactly 9 digits')
});

export type ReviewInfoFormData = yup.InferType<typeof validateSchema>;


const ReviewInfo: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { setNextStep, getNextEndpoint, correlationId } = useAuth();

    const [loading, setLoading] = useState<boolean>(false);
    const [manualEntry, setManualEntry] = useState<boolean>(false);

    const { control, handleSubmit, setValue, formState: { isValid, isSubmitting, isLoading, }, trigger } = useForm({
        mode: 'onChange',
        resolver: yupResolver(validateSchema),
        defaultValues: {
            region: "",
            address: "",
            extendedAddress: "",
            city: "",
            postalCode: "",
            firstName: "",
            lastName: "",
            dob: "",
            ssn: "",
        }
    });

    useEffect(() => {
        processVerification();
    }, []);

    const processVerification = async () => {
        setLoading(true);

        try {
            const nextEndpoint = getNextEndpoint();

            if (nextEndpoint === ApiEndpoints.V3_CHALLENGE) {
                await handleV3ChallengeRequest();
            } else if (nextEndpoint === ApiEndpoints.V3_COMPLETE) {
                setManualEntry(true);
            }
        } catch (error) {
            console.error('Error during verification:', error);
            alert(t('global.identityError'));
        } finally {
            setLoading(false);
        }
    };

    const handleV3ChallengeRequest = async () => {
        try {
            const response = await proveService.v3ChallengeRequest({ correlationId: correlationId as string });

            if (response && response.data) {
                const { data: challengeResponse } = response;
                const { individual = null, next, success } = challengeResponse;
                setNextStep(next);

                if (success && individual) {
                    const { firstName = '', lastName = '', addresses = [], dob = '', ssn = '' } = individual;

                    setValue('firstName', firstName);
                    setValue('lastName', lastName);
                    if (dob) setValue('dob', moment(dob).format("MM/DD/YYYY"));
                    setValue('ssn', ssn);

                    if (addresses && addresses.length > 0) {
                        const addressData = addresses[0];
                        const { city = '', postalCode = '', extendedAddress = '', region = '', address = '' } = addressData;

                        setValue('address', address);
                        setValue('extendedAddress', extendedAddress);
                        setValue('city', city);
                        setValue('region', region);
                        setValue('postalCode', postalCode);
                    }

                    // Trigger validation manually after setting the values
                    trigger();
                }
            }
        } catch (error) {
            console.error('Error during v3ChallengeRequest:', error);
        }
    };

    const completeIdentityVerify = async (data: ReviewInfoFormData) => {
        const nextEndpoint = getNextEndpoint();

        if (nextEndpoint !== ApiEndpoints.V3_COMPLETE) {
            return;
        }

        setLoading(true);

        try {
            const response = await proveService.v3CompleteRequest({
                correlationId: correlationId as string,
                individual: {
                    dob: moment(data.dob).format("YYYY-MM-DD"),
                    firstName: data.firstName,
                    lastName: data.lastName,
                    ssn: data.ssn,
                    addresses: [{
                        city: data.city,
                        address: data.address,
                        extendedAddress: data?.extendedAddress,
                        postalCode: data.postalCode,
                        region: data.region,
                    }]
                }
            });

            if (response && response.data && response.data.success) {
                handleCompleteResponse(response.data);
            } else {
                navigate('/verify-failure');
            }
        } catch (error: any) {
            console.error('Error during v3CompleteRequest:', error);
            alert(error.message ?? 'Please check your information and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCompleteResponse = (completeResponse: CompleteRequestResponse): void => {
        const { next, } = completeResponse;
        setNextStep(next);

        console.log('Successfully verified');
        navigate('/verify-success');
    };

    return (
        <Container sx={{ pb: 2, height: '100%', overflowX: 'hidden', overflowY: 'hidden' }}>
            {loading || isLoading ? (
                <Box display="flex" alignItems="center" justifyContent="center" pt={4}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box width="100%">
                    <Box width="100%" mb={3}>
                        <Typography textAlign="left" component="h1" variant="h4" fontWeight="bold">
                            {t('reviewInfo.title')}
                        </Typography>
                        <Typography textAlign="left" component="h2" variant="h6" fontWeight="bold" pb={1} mb={2}>
                            {t('reviewInfo.subTitle')}
                        </Typography>
                    </Box>

                    <Stack gap={1} mb={1} className="fadeIn">
                        <Grid container spacing={2}>
                            <Grid item xs={6} sx={{ pt: 1 }}>
                                <FormTextInput
                                    control={control}
                                    name="firstName"
                                    label={t('dataCollection.firstName.label')}
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={6} sx={{ pt: 1 }}>
                                <FormTextInput
                                    control={control}
                                    name="lastName"
                                    label={t('dataCollection.lastName.label')}
                                    type="text"
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: 1 }}>
                                <AddressInput
                                    control={control}
                                    onRegionChanged={(e: any) => setValue('region', e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: 1 }}>
                                <Controller
                                    control={control}
                                    name="dob"
                                    render={({ field: { ref: fieldRef, value, onChange }, fieldState: { error = undefined } }) => (
                                        <DOBInputField
                                            label={t('dataCollection.dob.label')}
                                            fontSize="large"
                                            dob={value as Moment | null}
                                            dobError={!!error}
                                            errorText={error?.message}
                                            showErrorText
                                            onDOBChanged={(newDOB: Moment | null) => onChange(newDOB)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: 1, mt: 1 }}>
                                <FormTextInput
                                    control={control}
                                    name="ssn"
                                    type="numeric"
                                    label={t('dataCollection.ssn.label')}
                                    maxLength={9}
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ pt: '0px !important' }}>
                                <Typography variant="caption" color={'gray'}>{t('dataCollection.ssn.disclaimer')}</Typography>
                            </Grid>
                        </Grid>
                    </Stack>
                    <Box display="flex" gap={1} mt={2.5} mb={2} className="fadeIn">
                        <ProveButton
                            onClick={handleSubmit(completeIdentityVerify)}
                            disabled={!isValid || isSubmitting}
                        >
                            {isSubmitting ? "Loading..." : t('reviewInfo.continueButton')}
                        </ProveButton>
                    </Box>
                </Box>
            )}
        </Container>
    );
}

export default ReviewInfo;
