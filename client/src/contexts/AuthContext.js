import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { authLoginFailure, authLoginSuccess } from "../actions/authActions";
import { authReducer } from "../reducers/AuthReducer";
import { requestDasboard, requestLogin } from "../apis/auth";

export const AuthContext = React.createContext();

const AuthProvider = (props) => {
  let history = useHistory();
  const initialState = {
    isAuthenticated: false,
    user: null,
    error: null,
    isFetching: false,
    token: null,
  };

  const [authState, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    requestDasboard()
      .then((response) => {
        if (response.data.success) {
          const payload = {
            user: response.data.user,
          };
          dispatch(authLoginSuccess(payload));
        } else {
          const payload = {
            error: response.data.message,
          };
          dispatch(authLoginFailure(payload));
        }
      })
      .catch((error) => {
        const payload = {
          error: error.response.data.message,
        };
        dispatch(authLoginFailure(payload));
      });
  }, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      console.log(authState.user);
      history.push("/dashboard");
    }
  }, [authState.isAuthenticated]);

  const login = (phone) => {
    requestLogin(phone)
      .then((response) => {
        if (response.data.success) {
          const payload = {
            user: response.data.user,
          };
          dispatch(authLoginSuccess(payload));
        } else {
          const payload = {
            error: response.data.message,
          };
          dispatch(authLoginFailure(payload));
        }
      })
      .catch((error) => {
        const payload = {
          error: error.response.data.message,
        };
        dispatch(authLoginFailure(payload));
      });
  };

  const authValue = { authState, dispatch, login };

  return (
    <AuthContext.Provider value={authValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
