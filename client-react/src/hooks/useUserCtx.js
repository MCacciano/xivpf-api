import { useCallback, useEffect } from 'react';
import { useUserContextState, useUserContextDispatch } from '../context/user';
import { SET_IS_LOADING, SET_USER } from '../context/user/types';

const useUserContext = () => {
  const state = useUserContextState();
  const dispatch = useUserContextDispatch();

  const setUser = useCallback(
    user => {
      dispatch({ type: SET_IS_LOADING, payload: true });
      dispatch({ type: SET_USER, payload: user });
    },
    [dispatch]
  );

  const setIsLoading = useCallback(
    isLoading => {
      dispatch({ type: SET_IS_LOADING, payload: isLoading });
    },
    [dispatch]
  );

  return { ...state, setUser, setIsLoading };
};

export default useUserContext;
