import { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';

export const useAuth = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      await signIn('google');
    } catch (error) {
      console.error('Error signing in:', error);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
    setLoading(false);
  };

  return {
    session,
    loading,
    handleSignIn,
    handleSignOut,
  };
};
