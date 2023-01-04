import { useAuth0 } from "@auth0/auth0-react";

const LoginPage = () => {
  const { loginWithRedirect, logout } = useAuth0();

  return (
    <div
      data-testid="login-page"
      className="container h-screen flex flex-col gap-6 justify-center items-center mx-auto p-4"
    >
      <div className="text-center">
        <i className="fa-solid fa-microphone text-6xl mb-6"></i>
        <p>Welcome to VAL. A voice activeated lyrics search tool.</p>
        <p>Signup or login to contineu.</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button
          className="bg-blue-600 py-2 px-6 font-bold rounded-lg hover:bg-blue-700"
          onClick={() => loginWithRedirect()}
        >
          Login
        </button>
        <button
          className="bg-blue-600 py-2 px-6 font-bold rounded-lg hover:bg-blue-700"
          onClick={() =>
            loginWithRedirect({
              screen_hint: "signup",
            })
          }
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
