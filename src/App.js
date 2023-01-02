import HomePage from "./components/homePage.js";
import LoginPage from "./components/loginPage.js";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <HomePage /> : <LoginPage />;
}

export default App;
