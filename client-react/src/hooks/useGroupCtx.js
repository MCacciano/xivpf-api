import { useEffect, useCallback } from 'react';
import lfg from '../axios/lfgroup';
import { useGroupContextState, useGroupContextDispatch } from '../context/group';
import { SET_GROUPS } from '../context/group/types';

const useGroupContext = () => {
  const state = useGroupContextState();
  const dispatch = useGroupContextDispatch();

  const setGroups = useCallback(
    groups => {
      dispatch({ type: SET_GROUPS, payload: groups });
    },
    [dispatch]
  );

  useEffect(() => {
    const getGroups = async () => {
      try {
        const { data } = await lfg.get('/groups');
        const { data: groups } = data;
        setGroups(groups);
      } catch (err) {
        console.error(err);
      }
    };

    getGroups();
  }, [setGroups]);

  return { ...state, setGroups };
};

export default useGroupContext;
