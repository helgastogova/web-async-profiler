import React from 'react';
import { useAuth } from '@client/hooks/use-auth';
import { Button } from '@ui';

const SignInButton: React.FC = () => {
  const { session, loading, handleSignIn, handleSignOut } = useAuth();

  if (loading) return <Button disabled>Loading...</Button>;
  if (session) return <Button onClick={handleSignOut}>Logout</Button>;

  return <Button onClick={handleSignIn}>Login</Button>;
};

export default SignInButton;
