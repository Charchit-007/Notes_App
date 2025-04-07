import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Auth_form from "../Auth_form"; // 

test("renders login form with email and password fields", () => {
  render(<Auth_form />);

  const emailInput = screen.getByPlaceholderText(/enter your name/i);
  const passwordInput = screen.getByPlaceholderText(/enter password/i);

  expect(emailInput).toBeInTheDocument();
  expect(passwordInput).toBeInTheDocument();
});
