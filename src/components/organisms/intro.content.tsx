import Image from 'next/image';
import IntroImage from 'public/vector/intro.svg';

export const IntroContent: React.FC = () => (
  <div className="max-w-screen-lg flex justify-center flex-column mt-20">
    <h1>How does the Fundraising App work?</h1>
    <div>
      <div>
        <h1>The basics for a new user</h1>
        <div>
          Dive into the future of fundraising with US, where blockchain&apos;s
          transparency is your tool for change. Quick to set up and secure to
          use, our platform ensures every contribution is traceable and every
          campaign is accountable. To register a fundraiser, simply connect with
          your MetaMask wallet and you&apos;ll be ready to launch your campaign
          in moments. Simple to support and easy to manage—begin your journey
          with FundMe today and join a community dedicated to making a
          difference.
        </div>
      </div>
      <Image
        src={IntroImage as unknown as string}
        width={600}
        height={600}
        alt="intro"
      />
    </div>
  </div>
);

export default IntroContent;
