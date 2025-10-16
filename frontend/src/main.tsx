// frontend/src/main.tsx
import { StrictMode } from 'react'; // Buena práctica de React
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';

// CORRECCIÓN CLAVE: Usamos { } para importar los componentes como exportaciones con nombre.
import { AuthProvider } from './context/AuthContext'; 
// import { ThemeProvider } from './context/ThemeContext'; 
// import { SalesProvider } from './context/SalesContext'; 

createRoot(document.getElementById('root')!).render(
  // Envolver toda la aplicación en StrictMode para detectar problemas potenciales.
  <StrictMode>
    {/* 1. El Router debe ser el más externo */}
    <BrowserRouter> 
      {/* 2. Proveedores Globales, el ThemeContext suele ser el más externo */}
     {/* <ThemeProvider> */}
        {/* 3. AuthContext (ya que muchas otras cosas dependen de él) */}
        <AuthProvider>
          {/* 4. Otros Contextos (como el de Ventas) */}
         {/* <SalesProvider> */}
            <App />
         {/* </SalesProvider> */}
        </AuthProvider>
     {/* </ThemeProvider> */}
    </BrowserRouter>
  </StrictMode>
);