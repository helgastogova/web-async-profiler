import s from './header.module.css';
import { AuthStatus } from '@client/auth/status';
import { Menu } from './components/menu';
import { Link } from '@ui';

type HeaderProps = {
  children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div className={s.menu}>
        <Link href="/">Web async profiler</Link>
        <Menu />
      </div>
      <AuthStatus />
      {children}
    </header>
  );
};
