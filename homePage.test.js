import { render, screen } from "@testing-library/react";
import App from "./App";
import LogoutBtn from "./logoutBtn";
import { useState } from "react";
import { act } from "react-dom/test-utils";
import axios from "axios";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("HomePage component", () => {
  it("should make a successful API request when searching for songs", async () => {
    // Mock the API call using axios
    axios.get.mockResolvedValue({ data: { data: [{ title: "Song 1" }] } });

    // Render the component
    const { getByTestId } = render(<HomePage />);

    // Simulate a change in the search input
    const searchInput = getByTestId("search-input");
    act(() => {
      fireEvent.change(searchInput, { target: { value: "song" } });
    });

    // Simulate a submit event on the form
    const form = getByTestId("search-form");
    act(() => {
      fireEvent.submit(form);
    });

    // Assert that the API request was made with the correct parameters
    expect(axios.get).toHaveBeenCalledWith(
      "https://api.lyrics.ovh/suggest/song"
    );

    // Assert that the state was updated with the correct data
    const { resultItems } = within(getByTestId("home-page")).getByTestId(
      "result-items"
    );
    expect(resultItems).toHaveLength(1);
  });
});
