import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginBtn = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="bg-blue-600 py-2 px-6 font-bold rounded-lg hover:bg-blue-700"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginBtn;
