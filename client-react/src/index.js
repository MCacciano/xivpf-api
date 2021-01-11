import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import './tailwind.css';
import App from './App';
import { UserContextProvider } from './context/user';
import { GroupContextProvider } from './context/group';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserContextProvider>
        <GroupContextProvider>
          <App />
        </GroupContextProvider>
      </UserContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
