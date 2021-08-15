import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../Styles/Login.css";

function Login(props) {
  let history = useHistory();

  const getOTP = (e) => {
    console.log("Login");
  };
  const register = (e) => {
    console.log("Register");
    history.push("/register");
  };
  return (
    <div className="background">
      <h1>Login</h1>
      <input type="tel" placeholder="Phone Number" />
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
