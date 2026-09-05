import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: '🏠' },
    { path: '/bautismos', label: 'Bautismos', icon: '✝️' },
    { path: '/comuniones', label: 'Comuniones', icon: '🍞' },
    { path: '/confirmaciones', label: 'Confirmaciones', icon: '🕊️' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-blue-800 to-blue-600 text-white shadow-lg print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center py-3">
          {/* Logo y título */}
          <div className="flex items-center space-x-3 mb-3 sm:mb-0">
            <svg 
              className="w-8 h-8" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
              />
            </svg>
            <div>
              <h1 className="text-xl font-bold">Sistema de Sacramentos</h1>
              <p className="text-xs opacity-75">Diócesis de Catamarca</p>
            </div>
          </div>

          {/* Navegación */}
          <nav className="flex flex-wrap justify-center gap-1 sm:gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                  flex items-center space-x-1
                  ${isActive(item.path) 
                    ? 'bg-white text-blue-700 shadow-md' 
                    : 'hover:bg-blue-700 hover:bg-opacity-50'
                  }
                `}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}