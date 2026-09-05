import React, { useState } from 'react';
import PlantillaComunicado from '../../PlantillaComunicado';
import ExcelGenerator from './ExcelGenerator';

export default function ConfirmacionesPage() {
  const [datosExcel, setDatosExcel] = useState([]);

  // Agrupamos los datos de a 2 para meter dos por hoja A4
  const paginas = [];
  for (let i = 0; i < datosExcel.length; i += 2) {
    paginas.push(datosExcel.slice(i, i + 2));
  }

  const handleDataLoaded = (data) => {
    setDatosExcel(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Controles: Solo visibles en pantalla */}
      <div className="print:hidden">
        <ExcelGenerator onDataLoaded={handleDataLoaded} />
        
        {datosExcel.length > 0 && (
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md text-center">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">
                  Registros cargados:
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">
                  {datosExcel.length}
                </span>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => window.print()}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition flex items-center"
                >
                  🖨️ Imprimir Comunicados
                </button>
                <button 
                  onClick={() => setDatosExcel([])}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vista de Impresión */}
      <div className="print:block mt-8">
        {paginas.length === 0 && datosExcel.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-500">No hay datos para mostrar</p>
            <p className="text-sm text-gray-400 mt-2">
              Carga un archivo Excel para generar los comunicados
            </p>
          </div>
        )}
        
        {paginas.map((pagina, index) => (
          <div 
            key={index} 
            className="w-[210mm] h-[297mm] mx-auto bg-white flex flex-col break-after-page box-border overflow-hidden print:shadow-none shadow-xl mb-8 print:mb-0"
          >
            {/* Mitad superior: Primer registro */}
            <div className="h-[148.5mm] w-full p-8 box-border border-b border-dashed border-gray-400">
              <PlantillaComunicado data={pagina[0]} />
            </div>

            {/* Mitad inferior: Segundo registro (si existe) */}
            {pagina[1] && (
              <div className="h-[148.5mm] w-full p-8 box-border">
                <PlantillaComunicado data={pagina[1]} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}