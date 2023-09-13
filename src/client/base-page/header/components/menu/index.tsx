import React from 'react';
import { Link } from '@ui';
import { useRouter } from 'next/router';
import s from './menu.module.css';

interface MenuProps {
  children?: React.ReactNode;
}

export const Menu: React.FC<MenuProps> = ({ children }) => {
  const router = useRouter();

  const isActive = (path: string): boolean => {
    return path === router.pathname;
  };

  return (
    <menu>
      <Link to="/upload" className={isActive('/upload') ? s.active : ''}>
        Upload
      </Link>
      {children}
    </menu>
  );
};
