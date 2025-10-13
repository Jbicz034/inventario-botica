import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import './index.css'
import App from './App.tsx'
import AuthProvider from './context/AuthContext.tsx'; 
import ThemeProvider from './context/ThemeContext.tsx'; 
import SalesProvider from './context/SalesContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <BrowserRouter> 
    <ThemeProvider>
      <AuthProvider>
        <SalesProvider>
          <App />
        </SalesProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
);