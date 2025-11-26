import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ThemeSwithcer from "./components/header/ThemeSwitcher";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Error from "./components/common/Error";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import Login from "./pages/Login";
import Books from "./pages/Books";

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: (
//             <Layout>
//                 <Home />
//             </Layout>
//         ),
//         errorElement: <Error />,
//     },
//     {
//         path: "/books",
//         element: (
//             <Layout>
//                 <Books />
//             </Layout>
//         ),
//     },
//     {
//         path: "/signup",
//         element: (
//             <Layout>
//                 <Signup />
//             </Layout>
//         ),
//     },
//     {
//         path: "/reset",
//         element: (
//             <Layout>
//                 <ResetPassword />
//             </Layout>
//         ),
//     },
//     {
//         path: "/login",
//         element: (
//             <Layout>
//                 <Login />
//             </Layout>
//         ),
//     },
// ]);

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
        ],
    },
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
