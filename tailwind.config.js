/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: 'class', // ✅ permite alternar entre claro e escuro manualmente
    theme: {
        extend: {
            colors: {
                primary: '#2563eb', // azul principal
                secondary: '#1e293b', // cinza escuro
                background: '#f9fafb',
                darkBackground: '#0f172a',
            },
        },
    },
    plugins: [],
}
