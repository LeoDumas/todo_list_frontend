import React, { useState } from "react";
import { Link } from "react-router-dom";

interface RegisterFormProps {
  username: string;
  email: string;
  password: string;
  onUsernameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  username,
  email,
  password,
  onUsernameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  const [passwordVerif, setPasswordVerif] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handlePasswordVerifChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordVerif(e.target.value);
    if (e.target.value !== password) {
      setPasswordError("Les mots de passe ne correspondent pas.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== passwordVerif) {
      setPasswordError("Les mots de passe ne correspondent pas.");
    } else {
      setPasswordError("");
      onSubmit(e);
    }
  };

  return (
    <form
      className="flex flex-col gap-y-6 bg-white border shadow-md p-8"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-xl font-semibold">Inscription</h2>
      </div>
      <div className="flex flex-col">
        <label htmlFor="username">Nom d'utilisateur :</label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={onUsernameChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={onEmailChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="password">Mot de passe :</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          className="border rounded-md p-2"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="passwordVerif">Confirmez le mot de passe :</label>
        <input
          type="password"
          name="passwordVerif"
          id="passwordVerif"
          value={passwordVerif}
          onChange={handlePasswordVerifChange}
          className="border rounded-md p-2"
        />
      </div>
      {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
      <button type="submit" className="bg-green-500 py-3 rounded-md text-white">
        Inscription
      </button>
      <div className="text-sm flex gap-x-3">
        <p>Vous avez déjà un compte ?</p>
        <Link to="/login" className="text-blue-600 font-medium">
          Connexion
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
