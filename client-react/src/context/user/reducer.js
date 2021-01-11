import { SET_USER } from './types';

const userContextReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};

export default userContextReducer;
