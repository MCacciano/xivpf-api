import { SET_GROUPS } from './types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_GROUPS:
      return { ...state, groups: payload };

    default:
      return state;
  }
};
