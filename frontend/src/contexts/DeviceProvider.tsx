import React, { ReactNode, createContext, useContext, useState } from 'react';

interface DeviceContextType {
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  phoneNumber: string;
  setPhoneNumber: (phoneNumber: string) => void;
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined);

export const DeviceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  return (
    <DeviceContext.Provider value={{
      isMobile,
      setIsMobile,
      phoneNumber,
      setPhoneNumber
    }}>
      {children}
    </DeviceContext.Provider>
  );
};

export const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error('useDevice must be used within a DeviceProvider');
  }
  return context;
};
