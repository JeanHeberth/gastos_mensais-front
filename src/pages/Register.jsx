import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

export default function Register() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-background dark:bg-darkBackground transition-colors duration-500">
            <ThemeToggle />

            <div className="w-96 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg transition-all duration-500">
                <h1 className="text-3xl font-semibold text-center text-primary dark:text-white mb-6">
                    Criar Conta 📝
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Nome completo"
                        className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <input
                        type="email"
                        placeholder="E-mail"
                        className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    />

                    <button
                        type="submit"
                        className="bg-primary text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                        Cadastrar
                    </button>
                </form>

                <p className="text-center text-gray-600 dark:text-gray-400 mt-4">
                    Já tem conta?{" "}
                    <button
                        onClick={() => navigate("/login")}
                        className="text-primary hover:underline"
                    >
                        Entrar
                    </button>
                </p>
            </div>
        </div>
    );
}
