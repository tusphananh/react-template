import React from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

function DassBoard(props) {
  const { authState, dispatch, login } = React.useContext(AuthContext);
  return (
    <div>
      {!authState.isAuthenticated && <Redirect to="/login" />}
      This is DashBoard
    </div>
  );
}

export default DassBoard;
