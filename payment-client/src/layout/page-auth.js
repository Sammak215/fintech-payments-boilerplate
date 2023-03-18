import Header from './header';
import Footer from './footer';
import { useRouter } from 'next/router';
import { useMainContext } from 'context/main';
import BarLoader from 'react-spinners/BarLoader';

export default function PageAuth({ noHeader, noFooter, children }) {
  const { ctx } = useMainContext();
  const router = useRouter();

  if (!ctx.loading_auth && !ctx.authenticated) {
    router.push('/login');

    return <></>;
  }

  return (
    <div className="h-[300px]">
      {ctx.loading_auth ? (
        <div>
          <BarLoader size={30} color="green" />
        </div>
      ) : (
        <>
          {!noHeader && <Header />}
          <main className="min-h-screen">{children}</main>
          {!noFooter && <Footer />}
        </>
      )}
    </div>
  );
}
