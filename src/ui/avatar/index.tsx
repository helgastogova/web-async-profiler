import { forwardRef } from 'react';

import cx from 'classnames';
import Image from 'next/image';

import s from './avatar.module.css';

type Props = {
  size?: '24' | '32';
  alt?: string;
  className?: string;
  src?: string | null;
};

const Avatar = forwardRef<HTMLImageElement, Props>(function Avatar(
  { alt, className, size = '24', src },
  ref,
) {
  if (!src) return null;

  return (
    <Image
      src={src}
      ref={ref}
      alt={alt ?? 'Avatar'}
      className={cx(s.root, size && `s${size}`, className)}
      width={size}
      height={size}
    />
  );
});

Avatar.displayName = 'Avatar';

export default Avatar;
