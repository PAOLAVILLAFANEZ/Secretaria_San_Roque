import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4 px-6 print:hidden mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} Diócesis de Catamarca</p>
        <p className="text-center">Parroquia Santuario San Roque</p>
        <div className="flex space-x-4">
          <span>Versión 1.0</span>
          <span className="hidden sm:inline">|</span>
          <span className="text-xs opacity-75">Desarrollado con ❤️</span>
        </div>
      </div>
    </footer>
  );
}