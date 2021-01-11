import { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import AuthRoute from './components/AuthRoute';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Login from './pages/Login';
import Groups from './pages/Groups';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <AuthRoute exact path="/groups" component={Groups} />
      </Switch>
    </>
  );
};

export default App;
