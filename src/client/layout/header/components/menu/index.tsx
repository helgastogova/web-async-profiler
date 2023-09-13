import { Link } from '@ui';
import { useRouter } from 'next/router';
import s from './menu.module.css';

type MenuProps = {
  children?: React.ReactNode;
};

export const Menu = ({ children }: MenuProps) => {
  const router = useRouter();

  const isActive = (path: string) => {
    return path === router.pathname;
  };

  return (
    <menu className={s.header}>
      <Link href="/upload" className={isActive('/upload') ? s.active : ''}>
        Upload new report
      </Link>
      {children}
    </menu>
  );
};
