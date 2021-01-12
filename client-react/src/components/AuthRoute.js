import { Redirect, Route } from 'react-router-dom';
import useUserContext from '../hooks/useUserCtx';

const AuthRoute = ({ component: Component, ...rest }) => {
  const { user } = useUserContext();

  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} />;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
};

export default AuthRoute;
