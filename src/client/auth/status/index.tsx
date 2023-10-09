import { useAuth } from '@client/hooks/use-auth';
import SignInButton from '../sing-in-button';
import { Avatar, Text } from '@ui';

import s from './status.module.css';

export const AuthStatus: React.FC = () => {
  const { session, loading } = useAuth();

  if (loading) return null;

  if (!session?.user) return <SignInButton />;

  const { name, image } = session.user;
  return (
    <div className={s.root}>
      <Text variant="body/base">Hey, {name}!</Text>
      <Avatar src={image} />
      <SignInButton />
    </div>
  );
};
