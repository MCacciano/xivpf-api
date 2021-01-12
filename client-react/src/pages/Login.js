import { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import lfg from '../axios/lfgroup';
import Button from '../components/Button';
import Form from '../components/Form';
import Input from '../components/Input';
import useUserContext from '../hooks/useUserCtx';

const Login = () => {
  const { user, isLoading, setUser } = useUserContext();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleOnChange = (e, callback) => {
    const { name, value } = e.currentTarget;

    callback(prev => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = async (e, route, form) => {
    e.preventDefault();

    try {
      const user = await getUser(route, form);

      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const getUser = async (route, form) => {
    console.log({ route, form });
    const { data } = await lfg.post(route, form);
    const { token } = data;

    localStorage.setItem('lfg_user', token);

    const { data: user } = await lfg.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return user;
  };

  if (user && !isLoading) {
    return <Redirect to="/groups" />;
  }

  return (
    <div className="absolute inset-0 w-screen h-screen flex justify-around items-center">
      <Form
        label="Login"
        onSubmit={e => handleOnSubmit(e, '/auth/login', loginForm)}
        className="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
      >
        <Input
          type="email"
          label="Email"
          id="login_email"
          name="email"
          value={loginForm.email}
          onChange={e => handleOnChange(e, setLoginForm)}
        />
        <Input
          type="password"
          id="login_password"
          label="Password"
          name="password"
          value={loginForm.password}
          onChange={e => handleOnChange(e, setLoginForm)}
        />
        <div className="flex flex-col mt-3">
          <Button type="submit">Sign In</Button>
        </div>
      </Form>
      <Form
        onSubmit={e => handleOnSubmit(e, '/auth/register', signUpForm)}
        label="Sign Up"
        className="flex flex-col justify-evenly border border-gray-500 rounded shadow p-8 w-1/3 max-w-md h-1/2"
      >
        <Input
          name="name"
          label="User Name"
          id="sign_up_name"
          value={signUpForm.name}
          onChange={e => handleOnChange(e, setSignUpForm)}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          id="sign_up_email"
          value={signUpForm.email}
          onChange={e => handleOnChange(e, setSignUpForm)}
        />
        <Input
          type="password"
          name="password"
          label="Password"
          id="sign_up_password"
          value={signUpForm.password}
          onChange={e => handleOnChange(e, setSignUpForm)}
        />
        <div className="flex flex-col mt-3">
          <Button type="submit">Sign Up</Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
