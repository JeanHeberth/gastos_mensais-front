import {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, useLocation} from "react-router-dom";
import {AnimatePresence, motion} from "framer-motion";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import NovoGasto from "./pages/NovoGasto.jsx";
import ThemeToggle from "./components/ThemeToggle.jsx";

// 💫 Transições entre páginas
function AnimatedRoutes() {
    const location = useLocation();

    const pageTransition = {
        initial: {opacity: 0, y: 20},
        animate: {opacity: 1, y: 0},
        exit: {opacity: 0, y: -20},
        transition: {duration: 0.4, ease: "easeInOut"},
    };

    return (
        <AnimatePresence mode="wait">
            <ThemeToggle/>
            <Routes location={location} key={location.pathname}>
                {/* Login */}
                <Route
                    path="/"
                    element={
                        <motion.div {...pageTransition}>
                            <Login/>
                        </motion.div>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <motion.div {...pageTransition}>
                            <Login/>
                        </motion.div>
                    }
                />

                {/* Registro */}
                <Route
                    path="/register"
                    element={
                        <motion.div {...pageTransition}>
                            <Register/>
                        </motion.div>
                    }
                />

                {/* Dashboard */}
                <Route
                    path="/dashboard"
                    element={
                        <motion.div {...pageTransition}>
                            <Dashboard/>
                        </motion.div>
                    }
                />

                {/* Novo Gasto */}
                <Route
                    path="/gastos/novo"
                    element={
                        <motion.div
                            initial={{opacity: 0, x: 60}}
                            animate={{opacity: 1, x: 0}}
                            exit={{opacity: 0, x: -60}}
                            transition={{duration: 0.4, ease: "easeInOut"}}
                        >
                            <NovoGasto/>
                        </motion.div>
                    }
                />
            </Routes>
        </AnimatePresence>
    );
}

// 💰 Splash Screen adaptativo (modo claro/escuro)
function SplashScreen() {
    return (
        <motion.div
            className="flex items-center justify-center h-screen
                 bg-gradient-to-br from-white via-gray-100 to-gray-200
                 dark:from-gray-900 dark:via-gray-800 dark:to-black
                 transition-colors duration-500"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 1}}
        >
            <motion.h1
                className="text-4xl md:text-6xl font-extrabold
                   text-indigo-600 dark:text-indigo-400 select-none"
                initial={{scale: 0.9}}
                animate={{scale: 1.1}}
                transition={{
                    repeat: Infinity,
                    repeatType: "reverse",
                    duration: 1.2,
                    ease: "easeInOut",
                }}
            >
                💰 Gastos Mensais
            </motion.h1>
        </motion.div>
    );
}

// 🚀 App principal
export default function App() {
    const [showSplash, setShowSplash] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setShowSplash(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <BrowserRouter>
            <AnimatePresence mode="wait">
                {showSplash ? (
                    <SplashScreen key="splash"/>
                ) : (
                    <motion.div
                        key="app"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{duration: 0.6}}
                    >
                        <AnimatedRoutes/>
                    </motion.div>
                )}
            </AnimatePresence>
        </BrowserRouter>
    );
}
