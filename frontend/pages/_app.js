import 'tailwindcss/tailwind.css';

import UserContextProvider from '../context/user';
import Navigation from '../components/Navigation';

function MyApp({ Component, pageProps }) {
  return (
    <UserContextProvider>
      <Navigation />
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
