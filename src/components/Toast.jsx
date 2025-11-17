export default function Toast({ message, type = "success", onClose }) {
    return (
        <div className={`
            fixed top-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white
            transition-all duration-300 z-50
            ${type === "success" ? "bg-green-600" : "bg-red-600"}
        `}>
            <span>{message}</span>
            <button onClick={onClose} className="ml-4 font-bold">×</button>
        </div>
    );
}
