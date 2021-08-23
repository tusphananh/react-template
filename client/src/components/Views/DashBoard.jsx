import React, { useEffect } from "react";
import { Redirect } from "react-router";
import { AuthContext } from "../../contexts/AuthContext";

function DassBoard(props) {
  const { authState, dispatch, authDashboard } = React.useContext(AuthContext);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      authDashboard();
    }
  }, []);

  return (
    <>
      {authState.isAuthenticated && !authState.isFetching && (
        <div>This is DashBoard</div>
      )}
      {!authState.isAuthenticated && !authState.isFetching && (
        <Redirect to="/login" />
      )}
    </>
  );
}

export default DassBoard;
