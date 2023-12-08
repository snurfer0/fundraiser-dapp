export interface FundraiserDto {
  address: string;
  name: string;
  url: string;
  description: string;
  imageUrl: string;
  goal?: number;

  custodian?: string;
  beneficiary?: string;

  totalDonations?: number;
  donationsCount?: number;
}
