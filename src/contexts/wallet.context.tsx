'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useWallet } from '../hooks/use.wallet';

interface WalletContextValue {
  account: string | null;
  connect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextValue | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [state, connect] = useWallet();

  return (
    <WalletContext.Provider value={{ account: state.account, connect }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWalletContext = (): WalletContextValue => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletContext must be used within a WalletProvider');
  }
  return context;
};
