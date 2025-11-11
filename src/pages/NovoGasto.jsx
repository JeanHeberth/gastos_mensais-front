import {useState} from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

export default function NovoGasto() {
    const navigate = useNavigate();

    const [gasto, setGasto] = useState({
        descricao: "",
        valorTotal: "",
        categoria: "",
        tipoPagamento: "",
        parcelas: 1,
        dataCompra: "",
    });

    const categorias = [
        "Alimentação",
        "Transporte",
        "Moradia",
        "Saúde",
        "Educação",
        "Lazer",
        "Eletrônico",
        "Outros",
    ];

    const tiposPagamento = [
        "Dinheiro",
        "Cartão de Crédito",
        "Cartão de Débito",
        "Pix",
        "Transferência",
        "Boleto",
    ];

    const handleChange = (e) => {
        const {name, value} = e.target;

        if (name === "valorTotal") {
            // Remove tudo que não for número
            const numericValue = value.replace(/\D/g, "");

            // Converte para float com duas casas decimais
            const floatValue = (parseInt(numericValue, 10) / 100).toFixed(2);

            // Formata em Real Brasileiro
            const formattedValue = isNaN(floatValue)
                ? ""
                : parseFloat(floatValue).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });

            setGasto({...gasto, [name]: formattedValue});
        } else {
            setGasto({...gasto, [name]: value});
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const valorNumerico = parseFloat(
                gasto.valorTotal.replace(/[R$\s.]/g, "").replace(",", ".")
            );

            const gastoFormatado = {
                ...gasto,
                valorTotal: valorNumerico,
                dataCompra: gasto.dataCompra ? `${gasto.dataCompra}T00:00:00` : null,
            };

            await api.post("/gastos", gastoFormatado);
            alert("✅ Gasto cadastrado com sucesso!");
            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao salvar gasto:", error);
            alert("❌ Erro ao salvar gasto. Verifique os dados.");
        }
    };

    return (
        <div
            className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition-colors duration-500">
            {/* Botão Voltar */}
            <button
                onClick={() => navigate("/dashboard")}
                className="absolute top-6 left-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md text-gray-800 dark:text-gray-100 font-medium shadow-md transition-all"
            >
                ← Voltar ao Dashboard
            </button>

            <div
                className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transition-colors duration-500">
                <h1 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-gray-100">
                    Novo Gasto 💰
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Descrição */}
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição"
                        value={gasto.descricao}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Valor formatado */}
                    <input
                        type="text"
                        name="valorTotal"
                        placeholder="Valor Total (R$)"
                        value={gasto.valorTotal}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Categoria */}
                    <select
                        name="categoria"
                        value={gasto.categoria}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Selecione a categoria</option>
                        {categorias.map((cat, index) => (
                            <option key={index} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>

                    {/* Tipo de pagamento */}
                    <select
                        name="tipoPagamento"
                        value={gasto.tipoPagamento}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="">Selecione o tipo de pagamento</option>
                        {tiposPagamento.map((tipo, index) => (
                            <option key={index} value={tipo}>
                                {tipo}
                            </option>
                        ))}
                    </select>

                    {/* Parcelas */}
                    <input
                        type="number"
                        name="parcelas"
                        min="1"
                        value={gasto.parcelas}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Data da compra */}
                    <input
                        type="date"
                        name="dataCompra"
                        value={gasto.dataCompra}
                        onChange={handleChange}
                        required
                        className="w-full p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />

                    {/* Botão salvar */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md shadow-md transition-colors"
                    >
                        Salvar
                    </button>
                </form>
            </div>
        </div>
    );
}
