import {useEffect, useState} from "react";
import {Sun, Moon} from "lucide-react";

export default function ThemeToggle() {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

    useEffect(() => {
        document.documentElement.classList.toggle("dark", theme === "dark");
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            aria-label="Alternar tema"
            className="fixed bottom-8 left-8 bg-gray-800 dark:bg-gray-100 text-yellow-400 dark:text-gray-800
                 p-4 rounded-full shadow-lg hover:scale-110 hover:rotate-12 hover:brightness-125
                 transition-all duration-300 ease-in-out"
        >
            {theme === "dark" ? <Sun size={22}/> : <Moon size={22}/>}
        </button>
    );
}
