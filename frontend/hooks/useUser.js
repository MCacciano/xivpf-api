import { useUserState, useUserDispatch } from '../context/user';
import { SET_USER, SET_TOKEN } from '../context/user/types';

const useUser = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();

  const setUser = (user = null) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setToken = (token = '') => {
    dispatch({ type: SET_TOKEN, payload: token });
  };

  return { state, setUser, setToken };
};

export default useUser;
