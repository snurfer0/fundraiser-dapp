import { Metadata } from 'next';
import { FundraisersTemplate } from 'src/components/templates';

export const metadata: Metadata = {
  title: 'Home',
};

export default function HomePage() {
  return <FundraisersTemplate />;
}
