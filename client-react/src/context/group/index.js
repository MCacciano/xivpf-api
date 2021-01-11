import { createContext, useContext, useReducer } from 'react';
import initialState from './state';
import groupContextReducer from './reducer';

const GroupContextState = createContext();
const GroupContextDispatch = createContext();

const GroupContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(groupContextReducer, initialState);

  return (
    <GroupContextState.Provider value={state}>
      <GroupContextDispatch.Provider value={dispatch}>{children}</GroupContextDispatch.Provider>
    </GroupContextState.Provider>
  );
};

const useGroupContextState = () => {
  const context = useContext(GroupContextState);

  if (context === undefined) {
    throw new Error('useGroupContextState must be used inside of a GroupContextProvider');
  }

  return context;
};

const useGroupContextDispatch = () => {
  const context = useContext(GroupContextDispatch);

  if (context === undefined) {
    throw new Error('useGroupContextDispatch must be used inside of a GroupContextProvider');
  }

  return context;
};

export { GroupContextProvider, useGroupContextState, useGroupContextDispatch };
