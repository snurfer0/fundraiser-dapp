import { Metadata } from 'next';
import { HomeTemplate } from 'src/components/templates';

export const metadata: Metadata = {
  title: 'Intro',
};

export default function HomePage() {
  return <HomeTemplate />;
}
