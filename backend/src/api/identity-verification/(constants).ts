export interface CreateRecordsParams {
  userId: string;
  sessionId: string;
  isMobile?: boolean;
}

export interface GetRecordsParams {
  id: number;
  sourceIP: string;
  phoneNumber: string;
  last4?: string;
}