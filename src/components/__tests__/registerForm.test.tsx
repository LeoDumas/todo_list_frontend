import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterForm from "../register/RegisterForm";

describe("RegisterForm Component", () => {
  const mockOnUsernameChange = jest.fn();
  const mockOnEmailChange = jest.fn();
  const mockOnPasswordChange = jest.fn();
  const mockOnSubmit = jest.fn((e) => e.preventDefault());

  const setup = () => {
    render(
      <Router>
        <RegisterForm
          username="test"
          email="test@example.com"
          password="password"
          onUsernameChange={mockOnUsernameChange}
          onEmailChange={mockOnEmailChange}
          onPasswordChange={mockOnPasswordChange}
          onSubmit={mockOnSubmit}
        />
      </Router>
    );
  };

  it("renders correctly", () => {
    setup();

    expect(screen.getByTestId("register-form")).toBeInTheDocument();
    expect(screen.getByTestId("register-heading")).toBeInTheDocument();
    expect(screen.getByTestId("username-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("passwordVerif-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("redirectToLogin-link")).toBeInTheDocument();
  });

  it("calls onSubmit when form is submitted", () => {
    setup();

    // Remplir les champs requis
    fireEvent.change(screen.getByTestId("username-input"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password" },
    });
    fireEvent.change(screen.getByTestId("passwordVerif-input"), {
      target: { value: "password" },
    });

    // Soumettre le formulaire
    fireEvent.submit(screen.getByTestId("register-form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("displays password error when passwords do not match", () => {
    setup();

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password1" },
    });
    fireEvent.change(screen.getByTestId("passwordVerif-input"), {
      target: { value: "password2" },
    });
    fireEvent.submit(screen.getByTestId("register-form"));

    expect(screen.getByTestId("password-error")).toBeInTheDocument();
  });

  it("has a link to login page", () => {
    setup();

    const linkElement = screen.getByText(/connexion/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/login");
  });
});
