import App from "../Routes/App";
import { render, screen } from '@testing-library/react';

it("renders without crashing", () => {
    render(<App />);
  });