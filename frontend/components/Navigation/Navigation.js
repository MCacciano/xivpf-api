import PropTypes from 'prop-types';

const Navigation = ({ user = null, onLogin, onLogout }) => {
  return (
    <nav className="flex justify-between p-6 border-b border-black">
      <h2 className="font-bold text-2xl">LFGPF</h2>
      <div>
        {user ? (
          <div className="flex space-x-4">
            <p>{user.name}</p>
            <button type="button" onClick={onLogout} className="text-red-600 text-xs underline">
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onLogin}
            className="border rounded bg-blue-600 text-white font-semibold text-sm py-1 px-2"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  user: PropTypes.object,
  onLogin: PropTypes.func,
  onLogout: PropTypes.func
};

export default Navigation;
