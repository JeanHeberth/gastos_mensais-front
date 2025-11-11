import {useEffect, useState} from "react";

export default function ThemeToggle() {
    const [isDarkMode, setIsDarkMode] = useState(
        document.documentElement.classList.contains("dark")
    );

    // Atualiza a classe do <html> sempre que o estado muda
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [isDarkMode]);

    return (
        <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="fixed bottom-6 left-6 z-50 bg-gray-700 text-yellow-400 p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
            title={isDarkMode ? "Modo claro" : "Modo escuro"}
        >
            {isDarkMode ? "🌞" : "🌙"}
        </button>
    );
}
