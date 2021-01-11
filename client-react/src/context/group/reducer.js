import { SET_GROUPS } from './types';

const groupContextReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_GROUPS:
      return { ...state, groups: payload };

    default:
      return state;
  }
};

export default groupContextReducer;
