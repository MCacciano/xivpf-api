import { useEffect, useState } from 'react';
import Link from 'next/link';
import useUser from '../../hooks/useUser';

const Navigation = () => {
  const {
    state: { user, token },
    setUser
  } = useUser();

  const [preLoaded, setPreLoaded] = useState(null);

  useEffect(() => {
    if (!preLoaded && localStorage.getItem('lfgpf-token')) {
      setPreLoaded(localStorage.getItem('lfgpf-token'));
    }
  }, []);

  const handleOnLogout = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`);
      localStorage.removeItem('lfgpf-token');
      setUser(null);
      setPreLoaded(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav
      className="sticky top-0 flex justify-between items-center p-6 border-b border-black bg-white"
      style={{ zIndex: '9999' }}
    >
      <Link href="/">
        <a className="font-bold text-2xl">LFGPF</a>
      </Link>
      {preLoaded || user ? (
        <div className="flex space-x-4">
          {user && (
            <div>
              <p>{user.name}</p>
            </div>
          )}
          <button
            type="button"
            onClick={handleOnLogout}
            className="text-red-600 text-xs underline"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <Link href="/login">
            <a className="h-full border border-blue-600 text-blue-600 font-semibold text-sm py-1 px-2 rounded shadow">
              Login
            </a>
          </Link>
          <p>or</p>
          <Link href="/sign-up">
            <a className="h-full border border-blue-600 text-blue-600 font-semibold text-sm py-1 px-2 rounded shadow">
              Sign Up
            </a>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
