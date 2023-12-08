import * as React from 'react';
import { BadgeVariant } from 'src/enums/badge.variant.enum';

interface Props {
  text?: string;
  className?: string;
  variant?: BadgeVariant;
}

const Badge: React.FC<Props> = ({
  text,
  className = '',
  variant = BadgeVariant.primary,
}) => {
  return <div className={`badge ${variant} ${className}`}>{text}</div>;
};

export default Badge;
