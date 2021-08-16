import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { AUTH_TYPE } from "../../reducers/type";
import { isValidPhoneNumber } from "../../utils/Validator";
import "../Styles/Login.css";
function Login(props) {
  let history = useHistory();
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const { authState, dispatch,login } = React.useContext(AuthContext);

  const getOTP = (e) => {
    console.log("Login");
    isValidPhoneNumber(phoneNumber, (data) => {
      if (data.success) {
        dispatch({
          type: AUTH_TYPE.AUTH_LOGIN_REQUEST,
          payload: {
            token: null,
          },
        });

        login(phoneNumber)
      } else {
        dispatch({
          type: AUTH_TYPE.AUTH_LOGIN_FAILURE,
          payload: {
            error: data.message,
          },
        });
      }
    });
  };
  const register = (e) => {
    console.log("Register");
    history.push("/register");
  };
  return (
    <div className="background">
      <h1>Login</h1>
      <input type="tel" placeholder="Phone Number" onChange={event => setPhoneNumber(event.target.value)}/>
      {authState.error && <div className="error">{authState.error}</div>}
      {authState.isAuthenticated && <div className="success">Successfull</div>}
      <button className="login-btn" onClick={getOTP}>
        Get OTP
      </button>

      <button className="register-btn" onClick={register}>
        Register
      </button>
    </div>
  );
}

export default Login;
