import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import IntroImage from 'public/svg/intro.svg';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { Button } from '../atoms';

const HomeTemplate: React.FC = () => {
  return (
    <div className="mt-20 select-none px-4 md:px-8">
      <h1 className="text-center text-3xl md:text-5xl font-bold my-4">
        Embark on Your Fundraising Journey
      </h1>
      <div className="flex justify-center mx-auto md:w-[70%] flex-col lg:flex-row mt-10">
        <div className="flex-1 md:mt-20">
          <h2 className="text-2xl md:text-4xl font-semibold my-6">
            Unlocking a New Era of Giving
          </h2>
          <div className="w-full text-md text-lg leading-relaxed">
            Dive into the future of fundraising where blockchain&apos;s
            transparency is your tool for change. Quick to set up and secure to
            use, our platform ensures every contribution is traceable and every
            campaign is accountable. To register a fundraiser, simply connect
            with your MetaMask wallet and you&apos;ll be ready to launch your
            campaign in moments. Simple to support and easy to manage.
            <div className="mt-2">
              Begin your journey with{' '}
              <strong className="underline decoration-sky-500/[.33]">
                Fundraiser
              </strong>{' '}
              today and join a community dedicated to making a difference.
            </div>
            <div className="mt-5 mb-10 md:mb-0 xs:flex xs:justify-center">
              <Link href="/start">
                <Button variant={ButtonVariant.Primary}>
                  Start Fundraising
                </Button>
              </Link>
              <Link href="/fundraisers" className="ml-2">
                <Button variant={ButtonVariant.Primary}>Our Fundraisers</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden md:block md:flex-1 justify-center">
          <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto">
            <Image
              src={IntroImage as unknown as string}
              width={600}
              height={600}
              alt="intro"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
