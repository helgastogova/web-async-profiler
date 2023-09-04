import React from 'react';
import { useAuth } from '@client/hooks/use-auth';
import { Button } from '@ui';

const SignInButton: React.FC = () => {
  const { session, loading, handleSignIn, handleSignOut } = useAuth();

  return (
    <>
      {loading ? (
        <Button disabled>Loading...</Button>
      ) : (
        <>
          {session ? (
            <Button onClick={handleSignOut}>Logout</Button>
          ) : (
            <Button onClick={handleSignIn}>Login</Button>
          )}
        </>
      )}
    </>
  );
};

export default SignInButton;
