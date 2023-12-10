import 'src/styles/global.css';
import { Open_Sans } from 'next/font/google';
import Head from 'next/head';
import { Toaster } from 'react-hot-toast';
import { Footer, NavBar } from 'src/components/organisms';
import { NAV_LINKS } from 'src/constants';
import Providers from 'src/utils/providers';

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
      <body className="bg-base-200">
        <Providers>
          <NavBar navLinks={NAV_LINKS} />
          {children}
          <Toaster />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
