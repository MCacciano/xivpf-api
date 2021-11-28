import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useUserState, useUserDispatch } from '../context/user';
import { SET_USER, SET_TOKEN } from '../context/user/types';

const useUser = () => {
  const state = useUserState();
  const dispatch = useUserDispatch();
  const router = useRouter();

  useEffect(() => {
    const currentToken = localStorage.getItem('lfgpf-token');

    if (currentToken) {
      const fetchUserDetails = async () => {
        const userRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${currentToken}` }
        });

        const { data: userDetails } = await userRes.json();

        setUser(userDetails);

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: userDetails.email, token: currentToken })
        });
        const { token } = await res.json();

        setToken(token);

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
    localStorage.setItem('lfgpf-token', token);
    dispatch({ type: SET_TOKEN, payload: token });
  };

  return { state, setUser, setToken };
};

export default useUser;
