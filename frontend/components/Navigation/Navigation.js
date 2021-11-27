import Link from 'next/link';
import PropTypes from 'prop-types';
import useUser from '../../hooks/useUser';

const API_URL = 'http://localhost:5000/api/v1';

const Navigation = () => {
  const {
    state: { user },
    setUser,
    setToken
  } = useUser();

  const handleOnLogin = async () => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'mozzey@test.com',
        password: '123456'
      })
    });
    const { token } = await res.json();

    const userRes = await fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const { data: userDetails } = await userRes.json();

    setToken(token);
    setUser(userDetails);
  };

  const handleOnLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="flex justify-between items-center p-6 border-b border-black">
      <h2 className="font-bold text-2xl">LFGPF</h2>
      {user ? (
        <div className="flex space-x-4">
          <p>{user.name}</p>
          <button type="button" onClick={handleOnLogout} className="text-red-600 text-xs underline">
            Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-2">
          <button type="button" onClick={handleOnLogin} className="text-red-600 text-xs underline">
            quick login
          </button>
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
