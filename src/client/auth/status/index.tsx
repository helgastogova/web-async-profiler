import { useAuth } from '@client/hooks/use-auth';
import SignInButton from '../sign-in-button';
import { Avatar } from '@ui';

import s from './status.module.css';

export const AuthStatus: React.FC = () => {
  const {
    session,
    session: { user },
    loading,
  } = useAuth();

  if (loading) return null;

  if (session) {
    return (
      <div className={s.root}>
        <p>Hey, {user?.name}!</p>
        <Avatar src={user?.image} />
        <SignInButton />
      </div>
    );
  }

  return <SignInButton />;
};
