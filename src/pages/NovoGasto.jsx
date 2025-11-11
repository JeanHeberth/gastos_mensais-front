import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {API_URL} from "../config/apiConfig.js";

export default function NovoGasto() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        descricao: "",
        valorTotal: "",
        categoria: "",
        tipoPagamento: "",
        parcelas: 1,
        dataCompra: "",
    });

    const [loading, setLoading] = useState(false);

    const categorias = [
        "Alimentação",
        "Transporte",
        "Educação",
        "Lazer",
        "Saúde",
        "Tecnologia",
        "Outros",
    ];

    const tiposPagamento = ["Cartão", "Débito", "Dinheiro", "Pix"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("token");

            const response = await fetch(API_URL + "gastos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Erro ao criar gasto");

            navigate("/dashboard");
        } catch (error) {
            alert("❌ Erro ao salvar gasto. Tente novamente.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                    🧾 Novo Gasto
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Descrição */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Descrição
                        </label>
                        <input
                            type="text"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            placeholder="Ex: Supermercado"
                            required
                        />
                    </div>

                    {/* Valor */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Valor Total
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="valorTotal"
                            value={formData.valorTotal}
                            onChange={handleChange}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            placeholder="Ex: 250.00"
                            required
                        />
                    </div>

                    {/* Categoria */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Categoria
                        </label>
                        <select
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            required
                        >
                            <option value="">Selecione</option>
                            {categorias.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tipo de Pagamento */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Tipo de Pagamento
                        </label>
                        <select
                            name="tipoPagamento"
                            value={formData.tipoPagamento}
                            onChange={handleChange}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            required
                        >
                            <option value="">Selecione</option>
                            {tiposPagamento.map((tp) => (
                                <option key={tp} value={tp}>
                                    {tp}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Parcelas */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Parcelas
                        </label>
                        <input
                            type="number"
                            name="parcelas"
                            value={formData.parcelas}
                            onChange={handleChange}
                            min="1"
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Data da Compra */}
                    <div>
                        <label className="block text-sm text-gray-700 dark:text-gray-300 mb-1">
                            Data da Compra
                        </label>
                        <input
                            type="date"
                            name="dataCompra"
                            value={formData.dataCompra}
                            onChange={handleChange}
                            className="w-full p-2.5 border rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                            required
                        />
                    </div>

                    {/* Botão de salvar */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2.5 mt-4 rounded-lg text-white font-semibold transition-all ${
                            loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700"
                        }`}
                    >
                        {loading ? "Salvando..." : "💾 Salvar Gasto"}
                    </motion.button>

                    {/* Voltar */}
                    <motion.button
                        type="button"
                        onClick={() => navigate("/dashboard")}
                        whileHover={{ scale: 1.05 }}
                        className="w-full mt-2 py-2.5 rounded-lg border border-gray-400 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
                    >
                        ← Voltar ao Dashboard
                    </motion.button>
                </form>
            </div>
        </motion.div>
    );
}
