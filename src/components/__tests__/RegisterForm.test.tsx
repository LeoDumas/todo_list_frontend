import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RegisterForm from "../register/RegisterForm";

describe("RegisterForm", () => {
  it("should render RegisterForm component", () => {
    render(
      <RegisterForm
        username=""
        email=""
        password=""
        onUsernameChange={jest.fn()}
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/nom d'utilisateur/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/confirmez le mot de passe/i)
    ).toBeInTheDocument();
  });

  it("should show password mismatch error", () => {
    render(
      <RegisterForm
        username=""
        email=""
        password="password1"
        onUsernameChange={jest.fn()}
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    fireEvent.change(screen.getByLabelText(/confirmez le mot de passe/i), {
      target: { value: "password2" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /inscription/i }));

    expect(
      screen.getByText(/les mots de passe ne correspondent pas/i)
    ).toBeInTheDocument();
  });
});
