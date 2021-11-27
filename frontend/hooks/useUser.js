import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUserState, useUserDispatch } from '../context/user';
import { SET_USER, SET_TOKEN } from '../context/user/types';

const API_URL = 'http://localhost:5000/api/v1';

const useUser = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem('lfgpf-token')) {
      const token = localStorage.getItem('lfgpf-token');
      
      const fetchUserDetails = async () => {
        const userRes = await fetch(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const { data: userDetails } = await userRes.json();
        setUser(userDetails);

        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userDetails.email, token })
        });
        const { token: newToken } = await res.json();

        localStorage.setItem('token', newToken);
        setToken(newToken);
        
        router.push('/');
      };

      fetchUserDetails();
    }

    return () => null;
  }, []);

  const setUser = (user = null) => {
    dispatch({ type: SET_USER, payload: user });
  };

  const setToken = (token = '') => {
    dispatch({ type: SET_TOKEN, payload: token });
  };

  return { state, setUser, setToken };
};

export default useUser;
