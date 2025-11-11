import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogOut, PlusCircle} from "lucide-react";
import api from "../services/api";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Bar,
    YAxis,
    XAxis,
    CartesianGrid,
    BarChart,
    LabelList,
} from "recharts";

const COLORS = ["#2563eb", "#16a34a", "#ea580c", "#9333ea", "#dc2626"];

export default function Dashboard() {
    const [resumo, setResumo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchResumo = async () => {
            try {
                const response = await api.get("/gastos/resumo?mes=11&ano=2025");
                setResumo(response.data);
            } catch (error) {
                console.error("Erro ao buscar resumo", error);
            }
        };
        fetchResumo();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (!resumo)
        return (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-10">
                Carregando...
            </p>
        );

    const data = Object.entries(resumo.porCategoria).map(
        ([categoria, valor]) => ({
            name: categoria,
            value: valor,
        })
    );

    return (
        <div
            className="relative p-6 min-h-screen transition-colors duration-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-6 relative">
                <h1 className="text-3xl font-bold text-center w-full">Dashboard 💸</h1>

                {/* Botão Logout */}
                <button
                    onClick={handleLogout}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 text-sm font-semibold"
                    title="Sair da conta"
                >
                    <LogOut size={18}/>
                    <span>Sair</span>
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div
                    className="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-700 dark:to-blue-600 text-white rounded-lg p-4 text-center shadow-md transition-colors duration-500">
                    <p className="text-sm opacity-80">Total Gasto</p>
                    <p className="text-2xl font-bold">
                        R$ {resumo.totalGastos.toLocaleString("pt-BR", {minimumFractionDigits: 2})}
                    </p>
                </div>
                <div
                    className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-green-700 dark:to-emerald-600 text-white rounded-lg p-4 text-center shadow-md transition-colors duration-500">
                    <p className="text-sm opacity-80">Categorias</p>
                    <p className="text-2xl font-bold">
                        {Object.keys(resumo.porCategoria).length}
                    </p>
                </div>
                <div
                    className="bg-gradient-to-r from-orange-600 to-amber-500 dark:from-orange-700 dark:to-amber-600 text-white rounded-lg p-4 text-center shadow-md transition-colors duration-500">
                    <p className="text-sm opacity-80">Lançamentos</p>
                    <p className="text-2xl font-bold">{resumo.quantidadeGastos}</p>
                </div>
            </div>

            {/* Gráfico de Pizza */}
            <div className="rounded-lg p-6 shadow-lg mb-8 bg-white dark:bg-gray-800 transition-colors duration-500">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Distribuição por Categoria 📊
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={0}
                            animationDuration={1000}
                            isAnimationActive={true}
                            label={({name, value}) => `${name}: R$${value}`}
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}/>
                            ))}
                        </Pie>
                        <Tooltip/>
                        <Legend/>
                    </PieChart>
                </ResponsiveContainer>
            </div>

            {/* Gráfico de Barras */}
            <div className="rounded-lg p-6 shadow-lg bg-white dark:bg-gray-800 transition-colors duration-500">
                <h2 className="text-lg font-semibold mb-4 text-center">
                    Comparativo de Gastos por Categoria 💰
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        data={data}
                        margin={{top: 10, right: 30, left: 0, bottom: 0}}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                        <XAxis dataKey="name" stroke="#9ca3af"/>
                        <YAxis stroke="#9ca3af"/>
                        <Tooltip/>
                        <Bar
                            dataKey="value"
                            fill="#3b82f6"
                            radius={[6, 6, 0, 0]}
                            animationBegin={0}
                            animationDuration={1200}
                            isAnimationActive={true}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-bar-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                            <LabelList dataKey="value" position="top" fill="#fff" fontSize={12}/>
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Botão Flutuante de Novo Gasto */}
            <button
                onClick={() => navigate("/gastos/novo")}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 hover:rotate-12 transition-all duration-300 z-50"
                title="Adicionar novo gasto"
            >
                <PlusCircle size={28}/>
            </button>
        </div>
    );
}
