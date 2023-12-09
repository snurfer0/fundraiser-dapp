'use client';

import React from 'react';
import { CreditCard } from 'react-feather';
import {
  useAccount,
  useBalance,
  useConnect,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useNetwork,
} from 'wagmi';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { shortenEthereumAddress } from 'src/helpers/short.address';
import { Button } from '../atoms';
import { Account } from '../organisms';
import Modal from './modal';

const WalletConnectButton = () => {
  const { address, isConnected } = useAccount();
  const { data } = useBalance({ address });
  const { connect, connectors } = useConnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });
  const { disconnect } = useDisconnect();
  const { chain } = useNetwork();
  const accountModalRef = React.useRef<HTMLDialogElement>(null);

  function onDisconnect() {
    const accountModal = accountModalRef.current;
    if (accountModal && accountModal.close) {
      accountModal.close();
    }
    disconnect();
  }

  function showAccountModal() {
    const accountModal = accountModalRef.current;
    if (accountModal && accountModal.showModal) {
      accountModal.showModal();
    }
  }

  function onClick() {
    if (isConnected) {
      return showAccountModal();
    }
    void connect({ connector: connectors[0] });
  }

  return (
    <>
      <Button onClick={onClick} variant={ButtonVariant.Secondary}>
        <CreditCard />
        <span>{address ? shortenEthereumAddress(address) : 'Connect'}</span>
      </Button>
      {address && isConnected && (
        <Modal id="account" title="Account" ref={accountModalRef}>
          <Account
            address={address}
            balance={Number(data?.formatted)}
            ensAvatar={ensAvatar}
            networkId={chain?.id}
            networkName={chain?.name}
            onDisconnect={onDisconnect}
          />
        </Modal>
      )}
    </>
  );
};

export default WalletConnectButton;
