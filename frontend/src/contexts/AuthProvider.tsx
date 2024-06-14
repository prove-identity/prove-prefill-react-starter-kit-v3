//package import 
import React, { ReactNode, createContext, useContext, useState } from 'react';
//module import 
import { AppEnv, Next, apiEndpoints } from '../services/prove-service/(definitions)';

interface AuthContextType {
  authToken: string | null;
  setAuthToken: (token: string) => void;
  correlationId: string | null;
  setCorrelationId: (correlationId: string) => void;
  appEnv: AppEnv | null;
  setAppEnv: (appEnv: AppEnv) => void;
  nextStep: Partial<Next> | null;
  setNextStep: (nextStep: Partial<Next>) => void;
  getNextEndpoint: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [correlationId, setCorrelationId] = useState<string | null>(null);
  const [nextStep, setNextStep] = useState<Partial<Next> | null>(null);
  const [appEnv, setAppEnv] = useState<AppEnv | null>(null);
  const getNextEndpoint = (): string | null => {
    if (!nextStep || !Object.keys(nextStep).length) {
      console.log('Next step is null, no API call needed.');
      return null;
    }
    const nextKey = Object.keys(nextStep)[0] as keyof Next;
    return apiEndpoints[nextKey];
  };

  return (
    <AuthContext.Provider value={{
      authToken,
      setAuthToken,
      correlationId,
      setCorrelationId,
      appEnv,
      setAppEnv,
      nextStep, 
      setNextStep,
      getNextEndpoint
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
