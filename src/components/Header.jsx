import ThemeToggle from "./ThemeToggle";

export default function Header({onLogout}) {
    return (
        <header
            className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow-md transition-colors duration-500">
            <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                💰 Gastos Mensais
            </h1>
            <div className="flex items-center gap-3">
                <button
                    onClick={onLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                >
                    Sair
                </button>
                <div className="relative top-[1px]">
                    <ThemeToggle/>
                </div>
            </div>

        </header>
    );
}
