import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../services/api";
import toast, {Toaster} from "react-hot-toast";

export default function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !senha) {
            toast.error("Preencha todos os campos!");
            return;
        }

        try {
            setLoading(true);
            const response = await api.post("/auth/login", {email, senha});

            // ✅ Armazena o token JWT no localStorage
            localStorage.setItem("token", response.data.token);

            toast.success("Login realizado com sucesso!");
            setTimeout(() => navigate("/dashboard"), 1000);
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message || "Falha no login. Verifique suas credenciais."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
            <Toaster position="top-right" reverseOrder={false}/>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">
                    Login 💼
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-70"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>

                <p className="text-center text-sm mt-4 text-gray-600 dark:text-gray-300">
                    Não tem conta?{" "}
                    <a
                        href="/register"
                        className="text-blue-600 hover:underline dark:text-blue-400"
                    >
                        Cadastre-se
                    </a>
                </p>
            </div>
        </div>
    );
}
