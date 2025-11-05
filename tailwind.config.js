/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",          // если есть
        "./src/**/*.{js,ts,jsx,tsx}" // все React-компоненты
    ],
    theme: {
        extend: {
            colors: {
                glass: 'rgba(255, 255, 255, 0.3)',
            },
            backdropBlur: {
                xs: '2px',
                sm: '4px',
                md: '8px',
                lg: '12px',
            },
            borderRadius: {
                xl: '1rem',
                '2xl': '1.5rem',
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
    ],
}
