import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import LoginForm from "../login/LoginForm";

describe("LoginForm Component", () => {
  const mockOnEmailChange = jest.fn();
  const mockOnPasswordChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());

  const setup = () => {
    render(
      <Router>
        <LoginForm
          email="test@example.com"
          password="password"
          onEmailChange={mockOnEmailChange}
          onPasswordChange={mockOnPasswordChange}
          onSubmit={mockOnSubmit}
        />
      </Router>
    );
  };

  it("renders correctly", () => {
    setup();

    expect(screen.getByTestId("login-form")).toBeInTheDocument();
    expect(screen.getByTestId("login-heading")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("register-link")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    setup();

    fireEvent.submit(screen.getByTestId("login-form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("has a link to register page", () => {
    setup();

    const linkElement = screen.getByTestId("register-link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/register");
  });
});
