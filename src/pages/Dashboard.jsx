import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import CardResumo from "../components/CardResumo";
import ListaGastos from "../components/ListaGastos";
import {useState} from "react";

export default function Dashboard() {
    const navigate = useNavigate();

    const [resumo,] = useState({
        total: 2000,
        categorias: 3,
        quantidade: 8,
    });

    const [gastos,] = useState([
        {descricao: "Curso Java", valor: 1200},
        {descricao: "Supermercado", valor: 800},
    ]);

    const handleLogout = () => {
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-500">
            <Header onLogout={handleLogout}/>

            <main className="flex flex-col items-center p-8 space-y-8">
                <div className="flex flex-wrap justify-center gap-6 w-full max-w-4xl">
                    <CardResumo titulo="Total Gasto" valor={`R$ ${resumo.total}`} cor="blue"/>
                    <CardResumo titulo="Categorias" valor={resumo.categorias} cor="green"/>
                    <CardResumo titulo="Lançamentos" valor={resumo.quantidade} cor="yellow"/>
                </div>

                <ListaGastos gastos={gastos}/>

                <button
                    onClick={() => navigate("/gastos/novo")} // você pode trocar pela navegação desejada
                    className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4
             shadow-lg hover:scale-110 hover:rotate-12 hover:brightness-125
             transition-all duration-300 ease-in-out"
                >
                    <span className="text-2xl font-bold">+</span>
                </button>

            </main>
        </div>
    );
}
