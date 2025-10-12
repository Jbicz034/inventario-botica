/** @type {import('tailwindcss').Config} */
export default {
  // Habilitar el modo oscuro basado en la clase 'dark' en el <html>
  darkMode: 'class', 
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // === PALETA PRINCIPAL NOVA SALUD ===
        'nova-primary': {
          // Morado oscuro del logo (usado para Sidebar, botones principales)
          DEFAULT: '#5B21B1', 
          light: '#6D28D9',
          dark: '#4C1D95',
        },
        'nova-secondary': {
          // Azul de acento (usado para links, hover, botones de éxito)
          DEFAULT: '#00BFFF', 
          dark: '#009ACD',
          light: '#33D1FF',
        },
        // === COLORES DE FONDO ===
        // Fondo principal claro de la aplicación
        'bg-light': '#F4F7F9',
        // Fondo para tarjetas/componentes en modo oscuro
        'card-dark': '#1F2937', 
        // Texto en modo oscuro
        'text-dark': '#E5E7EB',
      },
      boxShadow: {
        // Sombra más prominente para modales/tarjetas importantes
        '3xl': '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}