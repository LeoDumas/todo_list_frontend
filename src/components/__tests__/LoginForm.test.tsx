import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import LoginForm from "../login/LoginForm";

describe("LoginForm", () => {
  it("should render LoginForm component", () => {
    render(
      <LoginForm
        email=""
        password=""
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
        onSubmit={jest.fn()}
      />
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
  });

  it("should call onSubmit when form is submitted", () => {
    const handleSubmit = jest.fn();

    render(
      <LoginForm
        email="test@example.com"
        password="password"
        onEmailChange={jest.fn()}
        onPasswordChange={jest.fn()}
        onSubmit={handleSubmit}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /connexion/i }));

    expect(handleSubmit).toHaveBeenCalled();
  });
});
