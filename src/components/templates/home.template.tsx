import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FiArrowRightCircle } from 'react-icons/fi';
import IntroImage from 'public/svg/intro.svg';
import { ButtonVariant } from 'src/enums/button.variant.enum';
import { Button } from '../atoms';
const HomeTemplate: React.FC = () => {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={IntroImage as unknown as string}
          width={500}
          height={500}
          alt="intro"
          priority
        />
        <div>
          <h1 className="text-5xl font-bold">
            Embark on Your Fundraising Journey!
          </h1>
          <p className="py-6">
            Dive into the future of fundraising where blockchain&apos;s
            transparency is your tool for change. Quick to set up and secure to
            use, our platform ensures every contribution is traceable and every
            campaign is accountable. To register a fundraiser, simply connect
            with your MetaMask wallet and you&apos;ll be ready to launch your
            campaign in moments. Simple to support and easy to manage.
          </p>
          <div className="mt-5 mb-10 md:mb-0">
            <Link href="/fundraisers" className="ml-2">
              <Button variant={ButtonVariant.Primary}>Our Fundraisers</Button>
            </Link>
            <Link href="/start">
              <Button variant={ButtonVariant.Primary} className="ml-2">
                Start Fundraising <FiArrowRightCircle size={23} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeTemplate;
