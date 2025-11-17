export default function ListaGastos({gastos = []}) {
    return (
        <div className="rounded-xl p-6 shadow-lg mb-8 bg-white dark:bg-gray-800 overflow-auto min-h-[300px] max-h-[500px]">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Últimos Gastos
            </h3>

            {gastos.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400 text-center py-4">
                    Nenhum gasto encontrado.
                </p>
            ) : (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {gastos.map((gasto) => (
                        <li
                            key={gasto.id}
                            className="flex justify-between items-center py-3"
                        >
                            <div className="flex flex-col">
                                <span className="text-gray-700 dark:text-gray-300 font-medium">
                                    {gasto.descricao}
                                </span>

                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    {gasto.categoria || "Sem categoria"}
                                </span>

                                <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                                    {new Date(gasto.dataCompra).toLocaleDateString("pt-BR")}
                                </span>
                            </div>

                            <span className="text-blue-600 dark:text-blue-300 font-semibold">
                                R$
                                {" "}
                                {Number(gasto.valorTotal || gasto.valor)
                                    .toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                    })}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
