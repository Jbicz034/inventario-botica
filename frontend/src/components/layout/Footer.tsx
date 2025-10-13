// frontend/src/components/layout/Footer.tsx

import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 p-4 shadow-inner dark:bg-card-dark dark:border-gray-700 transition-colors duration-300">
      <div className="container mx-auto text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Nova Salud | Desarrollado por Fullstack Dev.
      </div>
    </footer>
  );
};

export default Footer;