// frontend/src/main.tsx
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; 
import './index.css';
import App from './App.tsx';
// Importamos el Provider de forma limpia
import AuthProvider from './context/AuthContext.tsx';
import ThemeProvider from './context/ThemeContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
    <ThemeProvider>
      <AuthProvider> 
        <App />
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);