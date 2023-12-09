import { BrowserProvider, parseEther } from 'ethers';
import { Fundraiser__factory } from 'src/types/typechain-dir-out/app';

type FundraiserOperators = {
  donate: ({
    fundraiserAddress,
    ethAmount,
  }: {
    fundraiserAddress: string;
    ethAmount: number;
  }) => Promise<boolean>;
};

/**
 * This hook is used to handle ethereum node requests
 */
const useFundraiser = (): Readonly<FundraiserOperators> => {
  /**
   * Donate to fundraiser
   * @param fundraiserAddress
   * @param ethAmount
   */
  const donate = async ({
    fundraiserAddress,
    ethAmount,
  }: {
    fundraiserAddress: string;
    ethAmount: number;
  }): Promise<boolean> => {
    try {
      if (!window.ethereum) return false;

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const fundraiserFactory = Fundraiser__factory.connect(
        fundraiserAddress,
        signer,
      );

      const tx = await fundraiserFactory.donate({
        value: parseEther(ethAmount.toString()),
      });

      const receipt = await tx.wait();

      return receipt?.status === 1;
    } catch (error) {
      return false;
    }
  };

  return {
    donate,
  };
};

export default useFundraiser;
