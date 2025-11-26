import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from "react-router-dom";

// test("renders header title", () => {
//      render(
//          <MemoryRouter>
//              <App />
//          </MemoryRouter>
//      );
//     const heading = screen.getByRole("heading", { name: /book store/i });
//     expect(heading).toBeInTheDocument();
// });

describe.skip("App", () => {
    test("renders header title", () => {
        render(
            <MemoryRouter>
                <App />
            </MemoryRouter>
        );

        const heading = screen.getByRole("heading", { name: /book store/i });
        expect(heading).toBeInTheDocument();
    });
});