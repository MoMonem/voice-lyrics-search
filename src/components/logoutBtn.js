import { useAuth0 } from "@auth0/auth0-react";

const LogoutBtn = () => {
  const { logout } = useAuth0();

  return (
    <button
      className="bg-blue-600 py-2 px-6 font-bold rounded-lg hover:bg-blue-700"
      onClick={() => logout({ returnTo: window.location.origin })}
    >
      Log Out
    </button>
  );
};

export default LogoutBtn;
