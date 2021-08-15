import React from 'react';
import Login from '../Templates/Login';
import Register from '../Templates/Register';

function Auth({route}) {
    return (
        <div>
            {route === "login" && <Login></Login>}
            {route === "register" && <Register></Register>}
        </div>
    );
}

export default Auth;