import {AUTH_TYPE} from "../constants/type";

export const authReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_TYPE.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        token: payload.token,
        user: null,
        isFetching: true,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_TYPE.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isFetching: false,
        isAuthenticated: true,
        error: null,
      };
    case AUTH_TYPE.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        user: null,
        isFetching: false,
        isAuthenticated: false,
        error: payload.error,
      };
    case AUTH_TYPE.AUTH_LOGOUT_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_TYPE.AUTH_LOGOUT_SUCCESS:
      return {
        ...state,
        token: payload.token,
        user: null,
        isFetching: false,
        isAuthenticated: false,
        error: null,
      };
    case AUTH_TYPE.AUTH_LOGOUT_FAILURE:
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
