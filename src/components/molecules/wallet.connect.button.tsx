'use client';

import React from 'react';
import { CreditCard } from 'react-feather';
import { useWalletContext } from 'src/contexts/wallet.context';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { shortenEthereumAddress } from 'src/helpers/short.address';
import { Button } from '../atoms';

const WalletConnectButton = () => {
  const { account, connect } = useWalletContext();
  return (
    <Button onClick={connect} variant={ButtonVariant.Secondary}>
      <CreditCard />
      <span>{account ? shortenEthereumAddress(account) : 'Connect'}</span>
    </Button>
  );
};

export default WalletConnectButton;
