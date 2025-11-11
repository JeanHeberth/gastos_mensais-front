import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NovoGasto from "./pages/NovoGasto.jsx";
import PrivateRoute from "./routes/PrivateRoute.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <ThemeToggle/>
            <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                {/* Rotas protegidas */}
                <Route
                    path="/dashboard"
                    element={
                        <PrivateRoute>
                            <Dashboard/>
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/gastos/novo"
                    element={
                        <PrivateRoute>
                            <NovoGasto/>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}
