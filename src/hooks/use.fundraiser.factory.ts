import axios, { AxiosResponse } from 'axios';
import { BrowserProvider } from 'ethers';
import config from 'src/config';
import { FundraiserValues } from 'src/schemas/fundraiser.schema';
import { FundraiserDto } from 'src/types/fundraiserDto';
import { Paginated } from 'src/types/pagination';
import { FundraiserFactory__factory } from 'src/types/typechain-dir-out/app';

type FundraiserFactoryOperators = {
  startFundraiser: (values: FundraiserValues) => Promise<boolean>;
  fetchFundraisers: ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }) => Promise<Paginated<FundraiserDto> | null>;
  fetchFundraisersForOwner: (
    owner: string,
    limit: number,
    offset: number,
  ) => Promise<Paginated<FundraiserDto> | null>;
};

/**
 * This hook is used to handle ethereum node requests
 */
const useFundraiserFactory = (): Readonly<FundraiserFactoryOperators> => {
  /**
   * Start fundraiser
   * @param values
   */
  const startFundraiser = async (
    values: FundraiserValues,
  ): Promise<boolean> => {
    try {
      if (!window.ethereum) return false;
      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const fundraiserFactory = FundraiserFactory__factory.connect(
        config.fundraiserFactoryAddress,
        signer,
      );
      const { name, url, imageURL, description, goal, beneficiary } = values;
      const tx = await fundraiserFactory.createFundraiser(
        name,
        url,
        imageURL,
        description,
        goal,
        beneficiary,
      );
      const receipt = await tx.wait();
      return receipt?.status === 1;
    } catch (error) {
      return false;
    }
  };

  /**
   * Fetch fundraisers
   * @param offset
   * @param limit
   */
  const fetchFundraisers = async ({
    offset,
    limit,
  }: {
    offset: number;
    limit: number;
  }): Promise<Paginated<FundraiserDto> | null> => {
    try {
      const response = await axios.get<
        Paginated<FundraiserDto>,
        AxiosResponse<Paginated<FundraiserDto>>
      >('/api/fundraisers', { params: { offset, limit } });
      if (!response.data) return null;
      return response.data;
    } catch (error) {
      return null;
    }
  };

  /**
   * Fetch fundraisers for owner
   * @param walletAdress
   * @param offset
   * @param limit
   */
  const fetchFundraisersForOwner = async (
    owner: string,
    offset: number,
    limit: number,
  ): Promise<Paginated<FundraiserDto> | null> => {
    try {
      const response = await axios.get<
        Paginated<FundraiserDto>,
        AxiosResponse<Paginated<FundraiserDto>>
      >('/api/fundraisers', { params: { offset, limit, owner } });
      if (!response.data) return null;
      return response.data;
    } catch (error) {
      return null;
    }
  };

  return {
    startFundraiser,
    fetchFundraisers,
    fetchFundraisersForOwner,
  };
};

export default useFundraiserFactory;
