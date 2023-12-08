import { JsonRpcProvider, formatEther } from 'ethers';
import { NextResponse } from 'next/server';
import config from 'src/config';
import { FundraiserDto } from 'src/types/fundraiserDto';
import { Paginated } from 'src/types/pagination';
import {
  FundraiserFactory__factory,
  Fundraiser__factory,
} from 'src/types/typechain-dir-out/app';

/**
 * Fetch fundraisers from blockcain
 * @param request
 */
export async function GET(request: Request) {
  try {
    // Extract search params from the request URL
    const { searchParams } = new URL(request.url);

    const { limit = 0, offset = 0 } = Object.fromEntries(
      searchParams.entries()
    );

    // Get the base URL from the environment
    const BASE_URL = process.env.ETH_HTTP_PROVIDER;

    // Get token from the environment
    const TOKEN = process.env.ETH_PROVIDER_TOKEN;

    // Check if .env secrets are valid
    if (!BASE_URL || !TOKEN) throw new Error('Invalid API URL');

    // Construct the final API endpoint
    const providerHttpUrl = `${BASE_URL}/${TOKEN}`;

    const provider = new JsonRpcProvider(providerHttpUrl);

    const fundraiserFactory = FundraiserFactory__factory.connect(
      config.fundraiserFactoryAddress,
      provider
    );

    // Get total fundraisers
    const totalCount = await fundraiserFactory.fundraisersCount();

    // Fetch fundraiser addresses
    const addresses = await fundraiserFactory.fundraisers(limit, offset);

    if (!addresses.length) {
      return NextResponse.json(
        {
          data: [],
          totalCount: 0,
          limit: Number(limit),
          offset: Number(offset),
          nextOffset: Number(offset),
          totalPages: 0,
        },
        {
          status: 200,
        }
      );
    }

    // Fetch fundraiser details from each address
    const fundraisers = await Promise.all(
      addresses.map(async address => {
        const fundraiser = Fundraiser__factory.connect(address, provider);
        const name = await fundraiser.name();
        const url = await fundraiser.url();
        const imageUrl = await fundraiser.imageURL();
        const description = await fundraiser.description();
        const goal = await fundraiser.goal();
        const beneficiary = await fundraiser.beneficiary();
        const custodian = await fundraiser.custodian();
        const totalDonations = await fundraiser.totalDonations();
        const donationsCount = await fundraiser.donationsCount();
        const owner = await fundraiser.owner();

        return {
          address,
          name,
          url,
          imageUrl,
          description,
          goal: Number(goal),
          beneficiary,
          custodian,
          owner,
          totalDonations: Number(formatEther(totalDonations)),
          donationsCount: Number(donationsCount),
        };
      })
    );

    const paginatedData: Paginated<FundraiserDto> = {
      data: fundraisers,
      totalCount: Number(totalCount),
      limit: Number(limit),
      offset: Number(offset),
      nextOffset: Number(offset) + Number(limit),
      totalPages: Math.ceil(Number(totalCount) / Number(limit)),
    };

    return NextResponse.json(paginatedData, {
      status: 200,
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(error, { status: 500 });
  }
}
