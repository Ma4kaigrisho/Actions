import { test, expect } from "vitest";
import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the app correctly", () => {
  render(<App />);
  expect(screen.getByRole("heading", { name: /vite \+ react/i })).toBeInTheDocument();
});