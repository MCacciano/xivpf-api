import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import lfg from '../axios/lfgroup';
import useUserContext from '../hooks/useUserCtx';

const Login = () => {
  const { user, setUser } = useUserContext();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    email: '',
    password: ''
  });

  const handleOnLoginChange = e => {
    const { name, value } = e.currentTarget;

    setLoginForm(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSignUpChange = e => {
    const { name, value } = e.currentTarget;

    setSignUpForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLoginSubmit = async () => {
    try {
      const { data } = await lfg.post('/auth/login', loginForm);
      const { token } = data;

      localStorage.setItem('lfg_user', token);

      const { data: user } = await lfg.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignUpSubmit = async () => {
    console.log(signUpForm);
  };

  useEffect(() => console.log('user', user), [user]);
  return user ? (
    <Redirect to="/" />
  ) : (
    <div className="absolute inset-0 w-screen h-screen flex justify-around items-center">
      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
      >
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium">Login</h1>
        </div>
        <label htmlFor="login_email" className="flex flex-col my-2">
          Email
          <input
            type="email"
            id="login_email"
            name="email"
            value={loginForm.email}
            onChange={handleOnLoginChange}
            className="border border-gray-500 rounded shadow p-1"
          />
        </label>
        <label htmlFor="login_password" className="flex flex-col my-2">
          Password
          <input
            type="password"
            id="login_password"
            name="password"
            value={loginForm.password}
            onChange={handleOnLoginChange}
            className="border border-gray-500 rounded shadow p-1"
          />
        </label>
        <div className="flex flex-col mt-3">
          <button
            type="button"
            className="p-1 mb-2 border border-black rounded shadow bg-black text-white text-sm font-medium font-rubik"
            onClick={handleLoginSubmit}
          >
            Sign In
          </button>
        </div>
        <div className="flex justify-center">
          <a className="text-sm text-blue-700" href="/">
            Forgot Password
          </a>
        </div>
      </form>
      <form
        onSubmit={e => e.preventDefault()}
        className="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
      >
        <div className="flex justify-center">
          <h1 className="text-3xl font-medium">Sign Up</h1>
        </div>
        <label htmlFor="sign_up_email" className="flex flex-col my-2">
          Email
          <input
            type="email"
            name="email"
            id="sign_up_email"
            value={signUpForm.email}
            onChange={handleOnSignUpChange}
            className="border border-gray-500 rounded shadow p-1"
          />
        </label>
        <label htmlFor="sign_up_password" className="flex flex-col my-2">
          Password
          <input
            type="password"
            name="password"
            id="sign_up_password"
            value={signUpForm.password}
            onChange={handleOnSignUpChange}
            className="border border-gray-500 rounded shadow p-1"
          />
        </label>
        <div className="flex flex-col mt-3">
          <button
            type="submit"
            onClick={handleSignUpSubmit}
            className="p-1 mb-2 border border-black rounded shadow bg-black text-white text-sm font-medium font-rubik"
          >
            Sign Up
          </button>
        </div>
        <div v-show="false" className="flex justify-center">
          <a className="text-sm text-blue-700" href="/">
            Forgot Password
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
