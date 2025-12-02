import ReactDOM from "react-dom/client";
import "sanitize.css";
import App from "./App";
import { BookStoreThemeProvider } from "./context/themeContext";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./hooks/queryClient"; // 🔥 동일한 인스턴스 사용
import React from "react";
import ToastContainer from "./components/common/toast/ToastContainer";

// if (process.env.NODE_ENV === "development") {
//     const { worker } = require("./mock/browser");
//     worker.start();
// }

// const root = ReactDOM.createRoot(
//     document.getElementById("root") as HTMLElement
// );

// root.render(
//     <QueryClientProvider client={queryClient}>
//         <BookStoreThemeProvider>
//             <App />
//         </BookStoreThemeProvider>
//     </QueryClientProvider>
// );

async function mountApp(){
    if (process.env.NODE_ENV === "development") {
        const { worker } = require("./mock/browser");
        await worker.start();
    }
    const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
    root.render(
        <React.StrictMode>
            <QueryClientProvider client={queryClient}>
            <BookStoreThemeProvider>
                <App />
                <ToastContainer />
            </BookStoreThemeProvider>
            </QueryClientProvider>         
        </React.StrictMode>
    );
}

mountApp();