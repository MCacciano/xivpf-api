import { SET_USER, SET_IS_LOADING } from './types';

const userContextReducer = (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user: payload, isLoading: false };
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    default:
      return state;
  }
};

export default userContextReducer;
