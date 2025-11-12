import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {toast} from "react-toastify";
import api from "../services/api";

export default function GastoForm({modo = "criar"}) {
    const navigate = useNavigate();
    const {id} = useParams();
    const gastoId = id || null;

    const [form, setForm] = useState({
        descricao: "",
        valorTotal: "",
        categoria: "",
        tipoPagamento: "",
        parcelas: 1,
        dataCompra: "",
    });

    const CATEGORIAS = [
        "Alimentação",
        "Educação",
        "Saúde",
        "Transporte",
        "Lazer",
        "Tecnologia",
        "Moradia",
        "Outros",
    ];

    const TIPOS_PAGAMENTO = [
        "Dinheiro",
        "Cartão de Crédito",
        "Cartão de Débito",
        "Pix",
        "Boleto",
        "Transferência",
    ];

    // 🔹 Carrega os dados se for edição
    useEffect(() => {
        if (modo === "editar" && gastoId) carregarGasto();
    }, [modo, gastoId]);

    const carregarGasto = async () => {
        try {
            const {data} = await api.get(`/gastos/${gastoId}`);
            setForm({
                descricao: data.descricao || "",
                valorTotal: formatarMoeda(data.valorTotal || 0),
                categoria: data.categoria || "",
                tipoPagamento: data.tipoPagamento || "",
                parcelas: data.parcelas || 1,
                dataCompra: data.dataCompra ? data.dataCompra.split("T")[0] : "",
            });
        } catch (error) {
            console.error("Erro ao carregar gasto:", error);
            toast.error("❌ Não foi possível carregar os dados do gasto.");
        }
    };

    // 🔹 Formata automaticamente o valor digitado
    const handleValorChange = (e) => {
        const valor = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
        const valorFormatado = (Number(valor) / 100).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
        setForm((prev) => ({...prev, valorTotal: valorFormatado}));
    };

    // 🔹 Remove a formatação "R$" e vírgulas antes de enviar ao backend
    const limparMoeda = (valor) => {
        if (!valor) return 0;
        return parseFloat(
            valor.replace(/[R$\s.]/g, "").replace(",", ".")
        );
    };

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const payload = {
                ...form,
                valorTotal: limparMoeda(form.valorTotal),
                parcelas: Number(form.parcelas),
                dataCompra: form.dataCompra ? `${form.dataCompra}T00:00:00` : null,
            };

            if (modo === "editar" && gastoId) {
                await api.put(`/gastos/${gastoId}`, payload);
                toast.success("💾 Gasto atualizado com sucesso!");
            } else {
                await api.post("/gastos", payload);
                toast.success("✅ Gasto cadastrado com sucesso!");
            }

            navigate("/dashboard");
        } catch (error) {
            console.error("Erro ao salvar gasto:", error);
            toast.error("❌ Erro ao salvar o gasto. Verifique os dados.");
        }
    };

    // 🔹 Formata valores existentes ao carregar
    const formatarMoeda = (valor) => {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    };

    return (
        <div
            className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 shadow-lg rounded-xl mt-10 transition-colors duration-500">
            <h1 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
                {modo === "editar" ? "✏️ Editar Gasto" : "➕ Novo Gasto"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Descrição</label>
                    <input
                        type="text"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Valor Total (R$)</label>
                    <input
                        type="text"
                        name="valorTotal"
                        value={form.valorTotal}
                        onChange={handleValorChange}
                        placeholder="R$ 0,00"
                        required
                        className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100 text-right font-semibold"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Categoria</label>
                    <select
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                    >
                        <option value="">Selecione uma categoria</option>
                        {CATEGORIAS.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Tipo de Pagamento</label>
                        <select
                            name="tipoPagamento"
                            value={form.tipoPagamento}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                        >
                            <option value="">Selecione um tipo</option>
                            {TIPOS_PAGAMENTO.map((tp, idx) => (
                                <option key={idx} value={tp}>
                                    {tp}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Parcelas</label>
                        <input
                            type="number"
                            name="parcelas"
                            min="1"
                            value={form.parcelas}
                            onChange={handleChange}
                            required
                            className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Data da Compra</label>
                    <input
                        type="date"
                        name="dataCompra"
                        value={form.dataCompra}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-md p-2 bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-all duration-300 font-semibold"
                >
                    {modo === "editar" ? "Salvar Alterações" : "Cadastrar Gasto"}
                </button>
            </form>
        </div>
    );
}
