export default function ListaGastos({ gastos }) {
    return (
        <div className="mt-8 w-full max-w-3xl bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 transition-colors duration-500">
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Últimos Gastos
            </h3>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {gastos.map((gasto, index) => (
                    <li key={index} className="flex justify-between py-3">
            <span className="text-gray-700 dark:text-gray-300">
              {gasto.descricao}
            </span>
                        <span className="text-blue-600 dark:text-blue-300 font-semibold">
              R$ {gasto.valor.toFixed(2)}
            </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
