import React from "react";
import { render, screen } from "@testing-library/react";
import HomePage from "./components/homePage";

describe("Home page", () => {
  it("renders the correct page and the form", () => {
    render(<HomePage />);
    expect(screen.getByTestId("home-page")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log Out" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByTestId("search-icon")).toBeInTheDocument();
    expect(screen.getByTestId("search-mic")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
  });
});
