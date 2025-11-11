const bgColors = {
    blue: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300",
    green: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300",
    yellow: "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300",
};

export default function CardResumo({titulo, valor, cor}) {
    return (
        <div
            className={`flex flex-col justify-center items-center p-6 rounded-xl shadow-md bg-${cor}-100 dark:bg-${cor}-900 transition-all duration-500 w-full sm:w-60`}
        >
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {titulo}
            </h2>
            <p className="text-2xl font-bold text-${cor}-600 dark:text-${cor}-300">
                {valor}
            </p>
        </div>
    );
}
