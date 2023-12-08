'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';
import useFundraiserFactory from 'src/hooks/use.fundraiser.factory';
import { FundraiserValues } from 'src/schemas/fundraiser.schema';
import { FundraiserForm } from '../organisms';

const StartTemplate: React.FC = () => {
  const router = useRouter();
  const { startFundraiser } = useFundraiserFactory();

  async function onSubmit(values: FundraiserValues) {
    const success = await startFundraiser(values);
    if (!success) {
      toast.error('Something went wrong, please try again later');
    } else {
      toast.success('Fundraiser created successfully');
      router.push('/fundraisers');
    }
  }

  return (
    <div className="w-100 flex justify-center">
      <div className="w-full mt-20 flex justify-center">
        <FundraiserForm onSubmit={onSubmit} />
      </div>
    </div>
  );
};

export default StartTemplate;
