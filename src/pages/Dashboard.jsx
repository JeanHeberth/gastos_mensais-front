import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {LogOut, PlusCircle, Calendar} from "lucide-react";
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
const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Dashboard() {
    const [resumo, setResumo] = useState(null);
    const [parcelas, setParcelas] = useState([]);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [ano, setAno] = useState(new Date().getFullYear());
    const [mostrarParcelas, setMostrarParcelas] = useState(false);
    const navigate = useNavigate();

    // --- API CALLS ---
    const fetchResumo = async () => {
        try {
            const response = await api.get(`/gastos/resumo?mes=${mes}&ano=${ano}`);
            setResumo(response.data);
        } catch (error) {
            console.error("Erro ao buscar resumo", error);
        }
    };

    const fetchParcelas = async () => {
        try {
            const mesFormatado = String(mes).padStart(2, "0");
            const response = await api.get(`/parcelas?mes=${ano}-${mesFormatado}`);
            setParcelas(response.data);
        } catch (error) {
            console.error("Erro ao buscar parcelas", error);
        }
    };

    useEffect(() => {
        fetchResumo();
    }, [mes, ano]);

    useEffect(() => {
        if (mostrarParcelas) fetchParcelas();
    }, [mostrarParcelas, mes, ano]);

    // --- LOGOUT ---
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    // --- LÓGICA DE ALTERAR ANO ---
    const handleAnoChange = (novoAno) => {
        const novoAnoNum = Number(novoAno);
        let novoMes = mes + 1;
        let anoFinal = novoAnoNum;

        if (novoMes > 12) {
            novoMes = 1;
            anoFinal += 1;
        }

        setAno(anoFinal);
        setMes(novoMes);
    };

    if (!resumo)
        return <p className="text-center text-gray-500 dark:text-gray-400 mt-10">Carregando...</p>;

    const totalGastos = resumo.total || resumo.totalGastos || 0;
    const data = Object.entries(resumo.porCategoria || {}).map(
        ([categoria, valor]) => ({name: categoria, value: Number(valor)})
    );
    const totalParcelasMes = parcelas.reduce((acc, p) => acc + Number(p.valor || 0), 0);

    return (
        <div
            className="relative p-6 min-h-screen transition-colors duration-500 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-6 relative">
                <h1 className="text-3xl font-bold text-center w-full">Dashboard 💸</h1>
                <button
                    onClick={handleLogout}
                    className="absolute top-0 right-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-md flex items-center gap-2 transition-all duration-300 text-sm font-semibold"
                >
                    <LogOut size={18}/>
                    <span>Sair</span>
                </button>
            </div>

            {/* Filtros */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
                <select
                    value={mes}
                    onChange={(e) => setMes(Number(e.target.value))}
                    className="p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                >
                    {MESES.map((m, index) => (
                        <option key={index + 1} value={index + 1}>{m}</option>
                    ))}
                </select>

                <select
                    value={ano}
                    onChange={(e) => handleAnoChange(e.target.value)}
                    className="p-2 rounded-md border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm"
                >
                    {[2024, 2025, 2026, 2027].map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>

                <button
                    onClick={() => setMostrarParcelas(!mostrarParcelas)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        mostrarParcelas
                            ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                            : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"
                    }`}
                >
                    <Calendar size={18}/>
                    {mostrarParcelas ? "Ocultar parcelas" : "Mostrar parcelas"}
                </button>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-sm opacity-80">Total Gasto</p>
                    <p className="text-2xl font-bold">
                        R$ {totalGastos.toLocaleString("pt-BR", {minimumFractionDigits: 2})}
                    </p>
                </div>
                <div
                    className="bg-gradient-to-r from-green-600 to-emerald-500 text-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-sm opacity-80">Categorias</p>
                    <p className="text-2xl font-bold">{Object.keys(resumo.porCategoria).length}</p>
                </div>
                <div
                    className="bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-lg p-4 text-center shadow-md">
                    <p className="text-sm opacity-80">Lançamentos</p>
                    <p className="text-2xl font-bold">{resumo.quantidadeGastos || resumo.quantidade}</p>
                </div>
            </div>

            {/* === 🔁 Alterna entre gráficos e tabela === */}
            {!mostrarParcelas ? (
                <>
                    {/* Gráfico de Pizza */}
                    <div
                        className="rounded-lg p-6 shadow-lg mb-8 bg-white dark:bg-gray-800 transition-colors duration-500">
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
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151"/>
                                <XAxis dataKey="name" stroke="#9ca3af"/>
                                <YAxis stroke="#9ca3af"/>
                                <Tooltip/>
                                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-bar-${index}`} fill={COLORS[index % COLORS.length]}/>
                                    ))}
                                    <LabelList dataKey="value" position="top" fill="#fff" fontSize={12}/>
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </>
            ) : (
                /* ✅ Tabela estilizada de Parcelas */
                <div
                    className="rounded-xl p-6 shadow-lg mb-8 bg-white dark:bg-gray-800 transition-colors duration-500 overflow-x-auto">
                    <h2 className="text-lg font-semibold mb-4 text-center flex items-center justify-center gap-2">
                        <Calendar size={20} className="text-indigo-600 dark:text-indigo-400"/>
                        Parcelas do mês
                    </h2>

                    {parcelas.length === 0 ? (
                        <p className="text-center text-gray-500 dark:text-gray-400">
                            Nenhuma parcela encontrada para {MESES[mes - 1]} / {ano}.
                        </p>
                    ) : (
                        <>
                            <table className="min-w-full text-sm border-separate border-spacing-y-1">
                                <thead>
                                <tr className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                                    <th className="px-4 py-2 text-left rounded-l-lg">#</th>
                                    <th className="px-4 py-2 text-left">Descrição</th>
                                    <th className="px-4 py-2 text-left">Categoria</th>
                                    <th className="px-4 py-2 text-right">Valor (R$)</th>
                                    <th className="px-4 py-2 text-center rounded-r-lg">Vencimento</th>
                                </tr>
                                </thead>
                                <tbody>
                                {parcelas.map((p, i) => (
                                    <tr
                                        key={i}
                                        className="bg-gray-50 dark:bg-gray-900/50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                                    >
                                        <td className="px-4 py-2">{p.numero}</td>
                                        <td className="px-4 py-2">{p.descricao || "-"}</td>
                                        <td className="px-4 py-2">{p.categoria || "-"}</td>
                                        <td className="px-4 py-2 text-right font-semibold text-indigo-600 dark:text-indigo-400">
                                            {Number(p.valor).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </td>
                                        <td className="px-4 py-2 text-center">
                                            {new Date(p.dataVencimento).toLocaleDateString("pt-BR")}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>

                            <div className="mt-4 text-right text-gray-700 dark:text-gray-300 font-semibold">
                                Total das parcelas:{" "}
                                <span className="text-indigo-600 dark:text-indigo-400">
                  {totalParcelasMes.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                  })}
                </span>
                            </div>
                        </>
                    )}
                </div>
            )}

            {/* Botão Flutuante */}
            <button
                onClick={() => navigate("/gastos/novo")}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center transform hover:scale-110 transition-all duration-300 z-50"
                title="Adicionar novo gasto"
            >
                <PlusCircle size={28}/>
            </button>
        </div>
    );
}
