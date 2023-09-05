import { useAuth } from '@client/hooks/use-auth';
import SignInButton from '../sign-in-button';
import { Avatar } from '@ui';

import s from './status.module.css';

export const AuthStatus: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (session?.user) {
    return (
      <div className={s.root}>
        <p>Hey, {session.user?.name}!</p>
        <Avatar src={session.user?.image} />
        <SignInButton />
      </div>
    );
  }

  return <SignInButton />;
};
