import ReactDOM from "react-dom/client";
import "sanitize.css";
import App from "./App";
import { BookStoreThemeProvider } from "./context/themeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/queryClient"; // 🔥 동일한 인스턴스 사용
import React from "react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <BookStoreThemeProvider>
            <App />
        </BookStoreThemeProvider>
    </QueryClientProvider>
);
