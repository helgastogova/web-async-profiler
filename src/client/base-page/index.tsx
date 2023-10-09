import React from 'react';
import { Header } from './header';
import { Layout } from '@ui';

interface BasePageProps {
  children?: React.ReactNode;
}

export const BasePage: React.FC<BasePageProps> = ({ children }) => {
  return (
    <main>
      <Header />
      <Layout>{children}</Layout>
    </main>
  );
};
