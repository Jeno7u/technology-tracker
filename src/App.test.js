import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders technologies heading", () => {
    render(<App />);
    const heading = screen.getByText(/Technologies:/i);
    expect(heading).toBeInTheDocument();
});
