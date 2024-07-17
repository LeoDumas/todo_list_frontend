import React from "react";
import { Link } from "react-router-dom";

interface LoginFormProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <form
    className="flex flex-col gap-y-6 bg-white border shadow-md p-8"
    onSubmit={onSubmit}
    data-testid="login-form"
  >
    <div>
      <h2 className="text-xl font-semibold" data-testid="login-heading">
        Connexion
      </h2>
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
        data-testid="email-input"
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
        data-testid="password-input"
      />
    </div>
    <button
      type="submit"
      className="bg-green-500 py-3 rounded-md"
      data-testid="submit-button"
    >
      Connexion
    </button>
    <div className="text-sm flex gap-x-3">
      <p>Vous n'avez pas de compte ?</p>
      <Link
        to="/register"
        className="text-blue-600 font-medium"
        data-testid="register-link"
      >
        Inscription
      </Link>
    </div>
  </form>
);

export default LoginForm;
