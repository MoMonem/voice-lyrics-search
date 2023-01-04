import React from "react";
import { render, screen } from "@testing-library/react";
import LoginPage from "./components/loginPage";
import { act } from "@testing-library/user-event";
import * as userEvent from "@testing-library/user-event";
import nock from "nock";

describe("Login page", () => {
  it("renders the right page and the right buttons", () => {
    render(<LoginPage />);
    expect(screen.getByTestId("login-page")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Signup" })).toBeInTheDocument();
  });
});
