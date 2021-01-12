import { useCallback } from 'react';
import lfg from '../axios/lfgroup';

import { useUserContextState, useUserContextDispatch } from '../context/user';
import { SET_IS_LOADING, SET_USER } from '../context/user/types';

const useUserContext = () => {
  const state = useUserContextState();
  const dispatch = useUserContextDispatch();

  const loginOrRegister = async (route, values) => {
    const { data } = await lfg.post(`/auth${route}`, values);
    const { token } = data;

    localStorage.setItem('lfg_user', token);

    const { data: user } = await lfg.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return user;
  };

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

  return { ...state, loginOrRegister, setUser, setIsLoading };
};

export default useUserContext;
