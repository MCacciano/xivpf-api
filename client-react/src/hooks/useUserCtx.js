import { useCallback, useEffect } from 'react';
import { useUserContextState, useUserContextDispatch } from '../context/user';
import { SET_USER } from '../context/user/types';

const useUserContext = () => {
  const state = useUserContextState();
  const dispatch = useUserContextDispatch();

  const setUser = useCallback(
    user => {
      dispatch({ type: SET_USER, payload: user });
    },
    [dispatch]
  );

  return { ...state, setUser };
};

export default useUserContext;
