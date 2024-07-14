import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export const useLoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log(response);
      navigate("/todo"); // Auto redirect if connexion successful
    } catch (error) {
      console.error("Error during auth :", error);
    }
  };

  return {
    email,
    password,
    handleEmailChange,
    handlePasswordChange,
    handleLogin,
  };
};
