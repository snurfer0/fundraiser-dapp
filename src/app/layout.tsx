import 'src/styles/global.css';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { NavBar } from 'src/components/organisms';
import { NAV_LINKS } from 'src/constants';
import Providers from 'src/utils/provider';

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-opensans',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={openSans.className}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <Providers>
          <NavBar navLinks={NAV_LINKS} />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
