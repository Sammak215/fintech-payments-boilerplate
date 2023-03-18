import { MainContextProvider } from "context/main";
import "antd/dist/antd.css";
import "../scss/main.scss";

function MyApp({ Component, pageProps, router }) {
  return (
    <MainContextProvider router={router}>
      <Component {...pageProps} />
    </MainContextProvider>
  );
}

export default MyApp;
