import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard";
import GastoForm from "./components/GastoForm";
import Login from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./pages/Register.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
    const [token, setToken] = useState(() => localStorage.getItem("token"));

    const handleLoginSuccess = (newToken) => {
        setToken(newToken);
    };

    useEffect(() => {
        const syncToken = () => setToken(localStorage.getItem("token"));

        // Atualiza o estado de autenticação quando houver logout/login em outras abas.
        window.addEventListener("storage", syncToken);
        return () => window.removeEventListener("storage", syncToken);
    }, []);

    return (
        <Router>
            <ThemeToggle />
            <Routes>
                {/* Página inicial redireciona pro dashboard se logado */}
                <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />} />

                {/* Dashboard principal */}
                <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />

                {/* 🔹 Novo Gasto */}
                <Route
                    path="/gastos/novo"
                    element={token ? <GastoForm modo="criar" /> : <Navigate to="/login" />}
                />

                {/* 🔹 Editar Gasto */}
                <Route
                    path="/gastos/editar/:id"
                    element={token ? <GastoForm modo="editar" /> : <Navigate to="/login" />}
                />

                <Route path="/register" element={<Register />} />

                {/* Login */}
                <Route
                    path="/login"
                    element={token ? <Navigate to="/dashboard" /> : <Login onLoginSuccess={handleLoginSuccess} />}
                />

                {/* Redireciona qualquer rota inválida */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>

            {/* Componente global de mensagens */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Router>
    );
}
