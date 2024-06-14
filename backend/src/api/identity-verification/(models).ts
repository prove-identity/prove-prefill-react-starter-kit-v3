import { body } from 'express-validator';

export const v3StartRequestValidation = [
    body('phoneNumber').isString().withMessage('Phone number must be a string'),
    body('last4SSN').isString().isLength({ min: 4, max: 4 }).withMessage('Last 4 SSN must be exactly 4 digits'),
    body('ipAddress').optional().isIP().withMessage('IP address must be valid'),
    body('flowType').isIn(['desktop', 'mobile']).withMessage('Flow type must be either desktop or mobile'),
    body('finalTargetUrl').optional().isURL().withMessage('Final target URL must be valid'),
];

export const v3ValidateRequestValidation = [
    body('correlationId').isString().withMessage('Correlation ID must be a string'),
];

export const v3ChallengeRequestValidation = [
    body('correlationId').isString().withMessage('Correlation ID must be a string'),
    body('dob').optional().isISO8601().withMessage('Date of birth must be in YYYY-MM-DD format'),
    body('last4SSN').optional().isLength({ min: 4, max: 4 }).withMessage('Last 4 SSN must be exactly 4 digits'),
];

export const v3CompleteRequestValidation = [
    body('correlationId').isString().withMessage('Correlation ID must be a string'),
    body('individual').isObject().withMessage('Individual must be an object'),
    body('individual.firstName').optional().isString().withMessage('First name must be a string'),
    body('individual.lastName').optional().isString().withMessage('Last name must be a string'),
    body('individual.dob').optional().isISO8601().withMessage('Date of birth must be in YYYY-MM-DD format'),
    body('individual.last4SSN').optional().isLength({ min: 4, max: 4 }).withMessage('Last 4 SSN must be exactly 4 digits'),
    body('individual.ssn').optional().isString().withMessage('SSN must be a string'),
    body('individual.emailAddresses').optional().isArray().withMessage('Email addresses must be an array'),
    body('individual.emailAddresses.*').optional().isEmail().withMessage('Each email address must be valid'),
    body('individual.addresses').optional().isArray().withMessage('Addresses must be an array'),
    body('individual.addresses.*.address').optional().isString().withMessage('Address must be a string'),
    body('individual.addresses.*.city').optional().isString().withMessage('City must be a string'),
    body('individual.addresses.*.extendedAddress').optional().isString().withMessage('Extended address must be a string'),
    body('individual.addresses.*.postalCode').optional().isString().withMessage('Postal code must be a string'),
    body('individual.addresses.*.region').optional().isString().withMessage('Region must be a string'),
];
