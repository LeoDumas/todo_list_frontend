import React from "react";
import { useRegisterForm } from "../../hooks/useRegisterForm";
import RegisterForm from "./RegisterForm";

const Register: React.FC = () => {
  const {
    username,
    email,
    password,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  } = useRegisterForm();

  return (
    <div className="h-screen flex items-center justify-center">
      <RegisterForm
        username={username}
        email={email}
        password={password}
        onUsernameChange={handleUsernameChange}
        onEmailChange={handleEmailChange}
        onPasswordChange={handlePasswordChange}
        onSubmit={handleRegister}
      />
    </div>
  );
};

export default Register;
