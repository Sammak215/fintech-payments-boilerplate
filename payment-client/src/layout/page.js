import Header from './header';
import HeaderTop from './header';
import Footer from './footer';
import { useRouter } from 'next/router';
import { useMainContext } from 'context/main';
import BarLoader from 'react-spinners/BarLoader';

export default function Page({ noHeader, noFooter, children }) {
  const { ctx } = useMainContext();
  const { pathname, push } = useRouter();

  // redirect if user already signup
  if (!ctx.loading_auth && ctx.authenticated) {
    const pathnames = ['/login', '/signup'];

    const havePathName = pathnames.find((p) => p === pathname);

    havePathName && push('/');

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
