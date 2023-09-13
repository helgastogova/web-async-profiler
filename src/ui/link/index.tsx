import cx from 'classnames';
import React from 'react';
import Link from 'next/link';

interface LinkProps {
  to: string;
  children?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  underlined?: boolean;
  className?: string;
}

const LinkComponent: React.FC<LinkProps> = ({
  href,
  children,
  target = '_self',
  underlined = false,
  className,
}) => {
  if (!children) {
    return null;
  }
  return (
    <Link
      href={href}
      target={target}
      className={cx(className, underlined && s.underlined)}
    >
      {children}
    </Link>
  );
};

export default LinkComponent;
