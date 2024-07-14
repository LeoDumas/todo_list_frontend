import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/register";

export const useRegisterForm = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerUser(username, email, password);
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("Error during registration :", error);
    }
  };
  return {
    username,
    email,
    password,
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRegister,
  };
};
