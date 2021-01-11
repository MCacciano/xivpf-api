import { createContext, useContext, useReducer } from 'react';
import initialState from './state';
import userContextReducer from './reducer';

const UserContextState = createContext();
const UserContextDispatch = createContext();

const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userContextReducer, initialState);

  return (
    <UserContextState.Provider value={state}>
      <UserContextDispatch.Provider value={dispatch}>{children}</UserContextDispatch.Provider>
    </UserContextState.Provider>
  );
};

const useUserContextState = () => {
  const context = useContext(UserContextState);

  if (context === undefined) {
    throw new Error('useUserContextState must be used inside of a UserContextProvider');
  }

  return context;
};

const useUserContextDispatch = () => {
  const context = useContext(UserContextDispatch);

  if (context === undefined) {
    throw new Error('useUserContextDispatch must be used inside of a UserContextProvider');
  }

  return context;
};

export { UserContextProvider, useUserContextState, useUserContextDispatch };
