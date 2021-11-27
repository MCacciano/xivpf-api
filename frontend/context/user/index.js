import { createContext, useContext, useReducer } from 'react';

import initialState from './state';
import userReducer from './reducer';

const UserStateContext = createContext(null);
const UserDispatchContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>{children}</UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
};

const useUserState = () => {
  const ctx = useContext(UserStateContext);

  if (ctx === undefined) {
    // fail fast
    throw new Error('You must use a UserContextProvider.');
  }

  return ctx;
};
const useUserDispatch = () => {
  const ctx = useContext(UserDispatchContext);

  if (ctx === undefined) {
    // fail fast
    throw new Error('You must use a UserContextProvider.');
  }

  return ctx;
};

export { UserContextProvider as default, useUserState, useUserDispatch };
