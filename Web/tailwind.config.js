/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                navy: {
                    DEFAULT: '#0A2E5C',
                    light: '#1A3E6C',
                    dark: '#051E3C',
                },
                emerald: {
                    DEFAULT: '#00A878',
                    light: '#10B888',
                    dark: '#009868',
                },
                charcoal: '#2C2C2C',
                'cool-gray': '#6B7280',
                'light-gray': '#E5E7EB',
                'off-white': '#F8FAFC',
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Montserrat', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
