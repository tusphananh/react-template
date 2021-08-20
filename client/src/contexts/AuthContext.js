import React, { useEffect, useReducer } from "react";
import { useHistory } from "react-router-dom";
import { authReducer } from "../reducers/AuthReducer";
import { AUTH_TYPE } from "../reducers/type";
const axios = require("axios").default;

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

  useEffect(() => {}, []);

  useEffect(() => {
    if (authState.isAuthenticated) {
      console.log(authState.user);
      history.push("/dashboard");
    }
  }, [authState.isAuthenticated]);

  const login = (phone) => {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    };
    const data = { phone: phone };
    axios
      .post(`${process.env.REACT_APP_API_HOST}/api/auth/login`, data, {
        headers: headers,
      })
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: AUTH_TYPE.AUTH_LOGIN_SUCCESS,
            payload: { user: response.data.user, token: null },
          });
        } else {
          dispatch({
            type: AUTH_TYPE.AUTH_LOGOUT_FAILURE,
            payload: response.data.error,
          });
        }
      })
      .catch((error) => {
        dispatch({
          type: AUTH_TYPE.AUTH_LOGOUT_FAILURE,
          payload: error.message,
        });
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
