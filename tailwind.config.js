/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{vue,js,ts,jsx,tsx}",
        'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
        'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {},
        fontFamily: { 'sans': 'Montserrat, Arial, sans-serif' }
    },
    plugins: [require("daisyui"), require('@tailwindcss/typography'), require('flowbite/plugin')],
    daisyui: {
        themes: ["light", "dark", "corporate", {
            "tiendazul": {

                "primary": "#27374D",

                "secondary": "#427D9D",

                "accent": "#526D82",

                "neutral": "#16171d",

                "base-100": "#DDE6ED",

                "info": "#80B3FF",

                "success": "#5cbc5f",

                "warning": "#80a5ff",

                "error": "#fb4b71",
            },
        },],
    }
}
