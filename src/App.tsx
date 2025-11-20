import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import ThemeSwithcer from "./components/header/ThemeSwitcher";
import { BookStoreThemeProvider } from "./context/themeContext";

function App() {

    return (
        <BookStoreThemeProvider>
            <ThemeSwithcer />
                <Layout>
                    <Home /> 
                </Layout>
        </BookStoreThemeProvider>
    );
}

export default App;
