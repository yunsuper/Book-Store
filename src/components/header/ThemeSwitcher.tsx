import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

function ThemeSwithcer(){
    const { themeName, toggleTheme } = useContext(ThemeContext);

    return <button onClick={() => toggleTheme()}>{themeName}</button>;
}

export default ThemeSwithcer;