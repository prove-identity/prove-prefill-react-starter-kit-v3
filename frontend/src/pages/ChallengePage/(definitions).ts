//package import 
import * as yup from 'yup';
import { matchIsValidTel, } from 'mui-tel-input';
//module import 
import { AppEnv } from '../../services/prove-service/(definitions)';

export const createValidationSchema = (appEnv: AppEnv) => yup.object().shape({
    last4SSN: yup
        .string()
        .matches(/^\d{4}$/, 'Must be exactly 4 digits')
        .required('Last 4 SSN is required')
        .max(4, 'Must be exactly 4 digits'),
    phoneNumber: yup
        .string()
        .test('is-valid-phone', 'Invalid phone number', (value: string | undefined) => {
            if (appEnv === AppEnv.SANDBOX) {
                return value?.length === 12;
            } else {
                return matchIsValidTel(value || '');
            }
        })
        .required('Phone number is required')
});

export type ChallengePageData = yup.InferType<ReturnType<typeof createValidationSchema>>;
