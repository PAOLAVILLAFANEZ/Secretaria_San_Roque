import React from 'react';

export default function ComunionesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">🍞</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Gestión de Comuniones
        </h2>
        <div className="max-w-lg mx-auto">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
            <p className="text-green-800">
              <span className="font-semibold">🚧 En desarrollo</span>
              <br />
              Esta funcionalidad estará disponible próximamente.
            </p>
          </div>
          <div className="flex justify-center space-x-4">
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed"
              disabled
            >
              📥 Cargar Excel
            </button>
            <button 
              className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg cursor-not-allowed"
              disabled
            >
              📋 Generar Certificados
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}