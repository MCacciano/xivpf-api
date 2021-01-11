import { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import lfg from './axios/lfgroup';

import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Groups from './pages/Groups';
import useUserContext from './hooks/useUserCtx';

const App = () => {
  const { user, setUser } = useUserContext();

  // user token is being set in localStorage so we can log the
  // user back in on page refresh
  // TODO: Set the token to expire in 1 hour
  // TODO: Delete the token from localStorage on logout
  useEffect(() => {
    if (!user) {
      const getUser = async () => {
        const cachedUserToken = localStorage.getItem('lfg_user');

        if (cachedUserToken) {
          try {
            const { data } = await lfg.get('/auth/me', {
              headers: {
                Authorization: `Bearer ${cachedUserToken}`
              }
            });

            setUser(data.data);
          } catch (err) {
            console.error(err);
          }
        }
      };

      getUser();
    }
  }, []);

  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login">{user ? <Redirect to="/groups" /> : <Login />}</Route>
        <AuthRoute path="/groups" component={Groups} />
      </Switch>
    </>
  );
};

export default App;
