// components/LogoutButton.js
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  // Debugging: Log logout function call
  const handleLogout = () => {
    console.log('Logging out...');
    logout({ logoutParams: { returnTo: window.location.origin } });
  };

  return (
    <button onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogoutButton;
