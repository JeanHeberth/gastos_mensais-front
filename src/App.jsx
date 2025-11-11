import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./page/Login.jsx";
import Register from "./page/Register.jsx";
import Dashboard from "./page/Dashboard.jsx";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </BrowserRouter>
    );
}
