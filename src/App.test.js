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
    setTimeout(() => {
      expect(screen.getByTestId("login-page")).toBeInTheDocument();
    }, 1000);
  });

  it("renders the home page if logged", () => {
    jest.mock("@auth0/auth0-react", () => ({
      useAuth0: jest.fn(() => ({
        isAuthenticated: true,
      })),
    }));

    render(<App />);
    setTimeout(() => {
      expect(screen.getByTestId("home-page")).toBeInTheDocument();
    }, 1000);
  });
});
