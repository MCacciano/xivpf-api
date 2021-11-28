import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useUser from '../../hooks/useUser';

const Navigation = () => {
  const {
    state: { user, token },
    setUser
  } = useUser();

  const [preLoaded, setPreLoaded] = useState(null);
  const [show, setShow] = useState('');

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
      className="sticky top-0 flex justify-between items-center px-10 py-2 border-b border-black bg-white"
      style={{ zIndex: '9999' }}
    >
      <Link href="/">
        <a className="font-bold text-2xl">LFGPF</a>
      </Link>
      {preLoaded || user ? (
        <div className="flex space-x-4">
          {user && (
            <div
              className="flex gap-x-2 relative border border-black rounded shadow py-1.5 pl-3 pr-8 cursor-pointer"
              onClick={() => {
                setShow(prev => (prev === '' ? 'nav' : ''));
              }}
            >
              <Image height={45} width={45} src="/images/default-user.jpg" />
              <div className="select-none">
                <p className="text-sm">{user.name || '--------'}</p>
                <p className="text-xs">
                  {/* <span className="font-semibold">Server:&nbsp;</span> */}
                  <span className="text-gray-400">{user.server || '----'}</span>
                </p>
              </div>
              {show === 'nav' && (
                <div className="w-full absolute left-0 top-full mt-1 border border-black bg-white rounded shadow">
                  <Link href="/">
                    <a className="block border-b border-black p-2 hover:bg-gray-400 hover:text-white">
                      Home
                    </a>
                  </Link>
                  <button
                    type="button"
                    onClick={handleOnLogout}
                    className="flex justify-start w-full p-2 hover:bg-gray-400 hover:text-white"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
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
