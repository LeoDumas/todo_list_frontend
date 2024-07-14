import React from "react";
import { useLoginForm } from "../../hooks/useLoginForm";
import LoginForm from "./LoginForm";

const Login: React.FC = () => {
  const {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  } = useLoginForm();

  return (
    <div className="h-screen flex items-center justify-center">
      <LoginForm
        email={email}
        password={password}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleLogin}
      />
    </div>
  );
};

export default Login;
