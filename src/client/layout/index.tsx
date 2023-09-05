import { Header } from './header';
import { Layout } from '@ui';

type BasePageProps = {
  children?: React.ReactNode;
};

export const BasePage = ({ children }: BasePageProps) => {
  return (
    <main>
      <div>
        <Header />
        <Layout>{children}</Layout>
      </div>
    </main>
  );
};
