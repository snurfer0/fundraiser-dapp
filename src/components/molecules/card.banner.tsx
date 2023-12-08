'use client';

import Image from 'next/image';
import { useState } from 'react';

interface Props {
  imageUrl: string;
}

const CardBanner: React.FC<Props> = ({ imageUrl }) => {
  // Default image URL
  const defaultImageUrl =
    'https://blog.bonfire.com/wp-content/uploads/2020/09/best-fundraising-websites.png';

  // State for the image URL
  const [currentImageUrl, setCurrentImageUrl] = useState(imageUrl);

  // Handle image loading error
  const handleImageError = () => {
    setCurrentImageUrl(defaultImageUrl);
  };

  return (
    <figure style={{ position: 'relative', width: '384px', height: '250px' }}>
      <Image
        src={currentImageUrl}
        alt="Shoes"
        layout="fill"
        objectFit="cover"
        onError={handleImageError}
      />
    </figure>
  );
};

export default CardBanner;
