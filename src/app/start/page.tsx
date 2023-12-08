import { Metadata } from 'next';
import { StartTemplate } from 'src/components/templates';

export const metadata: Metadata = {
  title: 'Start Fundraising',
};

export default function StartPage() {
  return <StartTemplate />;
}
