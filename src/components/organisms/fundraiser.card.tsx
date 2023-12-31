import Link from 'next/link';
import React, { forwardRef } from 'react';
import { FiHeart } from 'react-icons/fi';
import { BadgeVariant } from 'src/enums/badge.variant.enum';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { shortenEthereumAddress } from 'src/helpers/short.address';
import { shortenString } from 'src/helpers/short.text';
import { FundraiserDto } from 'src/types/fundraiserDto';
import { Badge, Button, ProgressBar } from '../atoms';
import { CardBanner, CardBody } from '../molecules';
interface Props {
  fundraiser: FundraiserDto;
  ref?: React.Ref<HTMLDivElement>;
  openDonationForm: () => void;
}

const FundraiserCard = forwardRef<HTMLDivElement, Props>(
  ({ fundraiser, openDonationForm }, ref) => {
    const {
      name,
      description,
      url,
      imageUrl,
      totalDonations = 0,
      donationsCount,
      beneficiary,
      custodian,
      goal = 0,
    } = fundraiser;
    const percentage = (goal > 0 ? (totalDonations / goal) * 100 : 0).toFixed(
      2,
    );
    return (
      <div ref={ref} className="card xs:w-80 lg:w-96 bg-base-100 shadow-xl">
        <CardBanner imageUrl={imageUrl} />
        <Badge
          variant={
            Number(percentage) >= 100
              ? BadgeVariant.primary
              : BadgeVariant.accent
          }
          className="absolute top-4 right-4"
          text={`${percentage}%`}
        />
        <CardBody
          title={shortenString(name, 27)}
          description={shortenString(description, 70)}
        >
          <div className="divider">
            <Link href={url} className="text-sm">
              Go to website
            </Link>
          </div>
          <div className="flex justify-between text-sm">
            <div>Donations</div>
            <div>{donationsCount}</div>
          </div>
          <div className="flex justify-between text-sm">
            <div>Beneficiary</div>
            <div>{beneficiary ? shortenEthereumAddress(beneficiary) : ''}</div>
          </div>
          <div className="flex justify-between text-sm">
            <div>Custodian</div>
            <div>{custodian ? shortenEthereumAddress(custodian) : ''}</div>
          </div>
          <div className="flex justify-center items-center">
            <ProgressBar value={totalDonations} max={goal} />
          </div>
          <div className="card-actions justify-end mt-2 space-x-2 w-full">
            <Button
              variant={ButtonVariant.Accent}
              onClick={openDonationForm}
              className="icon-button w-full"
            >
              Donate <FiHeart size={25} strokeWidth={1} />
            </Button>
          </div>
        </CardBody>
      </div>
    );
  },
);

export default FundraiserCard;
