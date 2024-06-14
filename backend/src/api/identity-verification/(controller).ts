// package import
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as proveInterfaces from '@prove-identity/prove-api/models/components';
// module import
import proveBackendSdk from '@src/integrations/prove-backend-sdk';
import { asyncMiddleware } from '@src/api/api.middleware';
import { handleValidationErrors } from '@src/helpers/validation.helper';
import {
  v3StartRequestValidation,
  v3ValidateRequestValidation,
  v3ChallengeRequestValidation,
  v3CompleteRequestValidation,
} from '@src/api/identity-verification/(models)';

export const getEchoEndpoint = asyncMiddleware(
  async (req: Request, res: Response, _next: NextFunction, _err: any) => {
    try {
      return res.status(StatusCodes.OK).json({
        message: 'ok',
        success: true,
      });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
);

export const v3StartRequest = [
  ...v3StartRequestValidation,
  handleValidationErrors,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction, _err: any): Promise<Response<proveInterfaces.V3StartResponse, Record<string, any>>> => {
    try {
      const { phoneNumber, last4SSN, flowType, finalTargetUrl } = req.body;

      const sdk = proveBackendSdk.getInstance();
      const { v3StartResponse } = await sdk.v3.v3StartRequest({
        phoneNumber,
        last4SSN,
        flowType,
        finalTargetUrl: finalTargetUrl || 'http://127.0.0.1:3000/sms-result',
      } as proveInterfaces.V3StartRequest);

      return res.status(StatusCodes.OK).json(v3StartResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
];

export const v3ValidateRequest = [
  ...v3ValidateRequestValidation,
  handleValidationErrors,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction, _err: any): Promise<Response<proveInterfaces.V3ValidateResponse, Record<string, any>>> => {
    try {
      const { correlationId } = req.body;

      const sdk = proveBackendSdk.getInstance();
      const { v3ValidateResponse } = await sdk.v3.v3ValidateRequest({
        correlationId,
      } as proveInterfaces.V3ValidateRequest);

      return res.status(StatusCodes.OK).json(v3ValidateResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
];

export const v3ChallengeRequest = [
  ...v3ChallengeRequestValidation,
  handleValidationErrors,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction, _err: any): Promise<Response<proveInterfaces.V3ChallengeResponse, Record<string, any>>> => {
    try {
      const { correlationId, dob, last4SSN } = req.body;

      const sdk = proveBackendSdk.getInstance();
      const { v3ChallengeResponse } = await sdk.v3.v3ChallengeRequest({
        correlationId,
        dob,
        last4SSN,
      } as proveInterfaces.V3ChallengeRequest);

      return res.status(StatusCodes.OK).json(v3ChallengeResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
];

export const v3CompleteRequest = [
  ...v3CompleteRequestValidation,
  handleValidationErrors,
  asyncMiddleware(async (req: Request, res: Response, _next: NextFunction, _err: any): Promise<Response<proveInterfaces.V3CompleteResponse, Record<string, any>>> => {
    try {
      const { individual, correlationId } = req.body;

      const sdk = proveBackendSdk.getInstance();
      const { v3CompleteResponse } = await sdk.v3.v3CompleteRequest({
        correlationId,
        individual,
      } as proveInterfaces.V3CompleteRequest);

      return res.status(StatusCodes.OK).json(v3CompleteResponse);
    } catch (error) {
      console.log(error);
      throw error;
    }
  })
];