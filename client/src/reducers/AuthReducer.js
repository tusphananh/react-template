import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGOUT_REQUEST,
  AUTH_LOGOUT_SUCCESS,
  AUTH_LOGOUT_FAILURE,
} from "../constants/authType";

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOGIN_REQUEST:
      return {
        ...state,
        user: null,
        isFetching: true,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        isFetching: false,
        isAuthenticated: true,
        error: null,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isFetching: false,
        isAuthenticated: false,
        error: payload.error,
      };
    case AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        user: null,
        isFetching: false,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_LOGOUT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        error: payload.error,
      };
    default:
      return state;
  }
};
