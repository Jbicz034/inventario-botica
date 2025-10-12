// frontend/src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';

// createRoot en lugar de ReactDOM.render
createRoot(document.getElementById('root')!).render(
  // Envolvemos la aplicación con todos los proveedores de contexto
  <BrowserRouter> 
    <ThemeProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);