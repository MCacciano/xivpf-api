import { SET_TOKEN, SET_USER } from './types';

export default (state, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload
      };
    case SET_TOKEN:
      return {
        ...state,
        token: payload
      };
    default:
      throw new Error('There is no action with that type');
  }
};
