import { Redirect, Route } from 'react-router-dom';
import useUserContext from '../hooks/useUserCtx';

const AuthRoute = ({ component: Component, ...props }) => {
  const { user } = useUserContext();

  return user ? <Component {...props} /> : <Redirect to="/login" />;
};

export default AuthRoute;
