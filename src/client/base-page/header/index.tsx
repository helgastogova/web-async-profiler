import React from 'react';
import s from './header.module.css';
import { AuthStatus } from '@client/auth/status';
import { Menu } from './components/menu';
import { Link } from '@ui';

interface HeaderProps {
  children?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className={s.header}>
      <div className={s.menuWrapper}>
        <Link to="/">Web async profiler</Link>
        {/* TODO: create a logo */}
        <Menu />
      </div>
      <AuthStatus />
      {children}
    </header>
  );
};
