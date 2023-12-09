import Image from 'next/image';
import React from 'react';
import { Clipboard, DollarSign, Link, LogOut } from 'react-feather';
import toast from 'react-hot-toast';
import AvatarImage from 'public/images/avatar.png';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { copyStringToClipboard } from 'src/helpers/copy.to.clipboard';
import { shortenEthereumAddress } from 'src/helpers/short.address';
import { Button } from '../atoms';

interface Props {
  address: string;
  balance: number;
  networkId?: number;
  networkName?: string;
  ensAvatar?: string | null;
  onDisconnect: () => void;
}

const Account: React.FC<Props> = ({
  address,
  balance,
  ensAvatar,
  networkId,
  networkName,
  onDisconnect,
}) => {
  function onCopyAddress() {
    void copyStringToClipboard(address);
    toast.dismiss();
    toast.success('Address copied to clipboard');
  }

  return (
    <div>
      <div className="flex">
        <div className="avatar">
          <div className="w-[60px] rounded-full">
            <Image
              src={ensAvatar || AvatarImage}
              alt="avatar"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div>
          <span className="text-sm text-gray-500">Your wallet</span>
          <button
            className="flex items-center ml-2 text-md cursor-pointer select-none"
            onClick={onCopyAddress}
          >
            {shortenEthereumAddress(address)} <Clipboard height={15} />
          </button>
        </div>
      </div>
      <div className="m-4">
        <div className="flex justify-between">
          <div className="flex items-center">
            <Link height={16} className="mr-1" /> Network
          </div>
          <div>
            {networkId} {networkName}
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex items-center">
            {' '}
            <DollarSign height={16} className="mr-1" /> Balance
          </div>
          <div>{balance.toFixed(2)} Eth</div>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <Button
          className="w-full"
          onClick={onDisconnect}
          variant={ButtonVariant.Secondary}
        >
          <LogOut />
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default Account;
