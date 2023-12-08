import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

interface WalletState {
  account: string | null;
}

export const useWallet = (): [WalletState, () => Promise<void>] => {
  const [account, setAccount] = useState<string | null>(null);

  const connectToWallet = useCallback(async () => {
    if (
      typeof window !== 'undefined' &&
      typeof window.ethereum !== 'undefined'
    ) {
      try {
        const accounts = await window.ethereum.request<string[]>({
          method: 'eth_requestAccounts',
        });
        if (accounts && accounts[0]) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        toast.error('Error connecting to Wallet');
      }
    } else {
      toast.error('Please install a Web3 wallet');
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    async function handleReload(): Promise<void> {
      const accounts = await window.ethereum?.request<string[]>({
        method: 'eth_requestAccounts',
      });
      if (accounts && accounts[0]) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    }

    function handleAccountsChanged(...args: unknown[]): void {
      const accounts = args[0] as string[];
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount(null);
      }
    }

    if (window.ethereum) {
      void window.ethereum.on('accountsChanged', handleAccountsChanged);
    }

    void handleReload();

    return () => {
      if (window.ethereum) {
        void window.ethereum.removeListener(
          'accountsChanged',
          handleAccountsChanged
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [{ account }, connectToWallet];
};
