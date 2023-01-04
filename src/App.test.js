import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders the login page if not logged", () => {
    jest.mock("@auth0/auth0-react", () => ({
      useAuth0: jest.fn(() => ({
        isAuthenticated: false,
      })),
    }));

    render(<App />);

    expect(screen.getByTestId("login-page")).toBeInTheDocument();
  });
  it("renders the home page if logged", () => {
    jest.mock("@auth0/auth0-react", () => ({
      useAuth0: jest.fn(() => ({
        isAuthenticated: true,
      })),
    }));

    render(<App />);

    expect(screen.getByTestId("home-page")).toBeInTheDocument();
  });
});
