import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import OrderList from "./pages/OrderList";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        errorElement: <Error />,
        children: [
            { index: true, element: <Home /> },
            { path: "books", element: <Books /> },
            { path: "signup", element: <Signup /> },
            { path: "reset", element: <ResetPassword /> },
            { path: "login", element: <Login /> },
            { path: "books/:bookId", element: <BookDetail /> },
            { path: "cart", element: <Cart /> },
            { path: "order", element: <Order /> },
            { path: "orderlist", element: <OrderList /> },
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
