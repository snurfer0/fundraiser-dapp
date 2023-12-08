import { BrowserProvider, formatEther } from 'ethers';
import { useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

interface WalletOperators {
  account: string | null;
  balance: number;
  connectToWallet: () => Promise<void>;
}

export const useWallet = (): WalletOperators => {
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

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
        const balance = await getBalance(accounts[0]);
        setBalance(balance);
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

  const getBalance = async (account: string): Promise<number> => {
    try {
      if (!window.ethereum) return 0;
      const provider = new BrowserProvider(window.ethereum);

      // Query the balance
      const balance = await provider.getBalance(account);

      // Convert the balance from Wei to Ether
      const balanceInEth = formatEther(balance);
      return Number(balanceInEth);
    } catch (error) {
      return 0;
    }
  };

  return { account, balance, connectToWallet };
};
