import LoginBtn from "./loginBtn.js";
import SignupBtn from "./signupBtn.js";

const LoginPage = () => {
  return (
    <div class="container h-screen flex flex-col gap-6 justify-center items-center mx-auto p-4">
      <div class="text-center">
        <i class="fa-solid fa-microphone text-6xl mb-6"></i>
        <p>Welcome to VAL. A voice activeated lyrics search tool.</p>
        <p>Signup or login to contineu.</p>
      </div>
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LoginBtn />
        <SignupBtn />
      </div>
    </div>
  );
};

export default LoginPage;
