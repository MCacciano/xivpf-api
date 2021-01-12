import { Redirect } from 'react-router-dom';

import useUserContext from '../hooks/useUserCtx';

import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const Login = () => {
  const { user, isLoading } = useUserContext();

  if (user && !isLoading) {
    return <Redirect to="/groups" />;
  }

  return (
    <div className="absolute inset-0 w-screen h-screen flex justify-around items-center">
      <LoginForm />
      <SignUpForm />
    </div>
  );
};

export default Login;
