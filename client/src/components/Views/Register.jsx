import React from "react";
import { useHistory } from "react-router-dom";
import "../Styles/Register.css";

function Register(props) {
    let history = useHistory();
    const register = (e) => {
        console.log("Register");
    }
    const login = (e) => {
        history.push("/login");
    }
    return (
        <div className="background">
      <h1>Register</h1>
      <input type="tel" placeholder="Phone Number" />
      <div className="register-frame" >
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
      </div>
      <button className="register-btn" onClick={register}>
        Register
      </button>
      <button className="login-btn" onClick={login}>
        Login
      </button>
    </div>
    );
}

export default Register;