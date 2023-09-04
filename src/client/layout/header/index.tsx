import s from './header.module.css';
import { AuthStatus } from '@client/auth/status';

type HeaderProps = {
  children?: React.ReactNode;
};

export const Header = ({ children }: HeaderProps) => {
  return (
    <header className={s.header}>
      <div>Web async profiler</div>
      <AuthStatus />
      {children}
    </header>
  );
};
