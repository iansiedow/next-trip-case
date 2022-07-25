import { render, screen } from "@testing-library/react";
import App from "./App";

describe("<App />", () => {
  test("renders home page", () => {
    render(<App />);
    expect(screen.getByText("Minneapolis Bus Lines")).toBeInTheDocument();
  });
});
