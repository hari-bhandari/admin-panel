import {
  USER_LOADED,
  LOGOUT,
  AUTH_ERROR_GET_ME
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading:false
      };
    case AUTH_ERROR_GET_ME:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading:false
      };
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      };

    default:
      return state;
  }
};
