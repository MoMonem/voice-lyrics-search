import HomePage from "./components/homePage.js";
import LoginPage from "./components/loginPage.js";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="container mx-auto h-screen text-center flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return isAuthenticated ? <HomePage /> : <LoginPage />;
}

export default App;
