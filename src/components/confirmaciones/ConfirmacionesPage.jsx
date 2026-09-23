import { useState } from 'react';
import PlantillaComunicado from '../../PlantillaComunicado';
import ExcelGenerator from './ExcelGenerator';
import { HojaA4, MitadHoja } from '../common/PrintLayout';

export default function ConfirmacionesPage() {
  const [datosExcel, setDatosExcel] = useState([]);

  // Tres copias por registro: Fiel, Parroquia y Comunicación
  const copias = [];
  datosExcel.forEach((dato) => {
    copias.push({ data: dato, tipo: 'fiel' });
    copias.push({ data: dato, tipo: 'parroquia' });
    copias.push({ data: dato, tipo: 'comunicado' });
  });

  // Agrupamos de a 2 copias para meter dos por hoja A4
  const paginas = [];
  for (let i = 0; i < copias.length; i += 2) {
    paginas.push(copias.slice(i, i + 2));
  }

  const handleDataLoaded = (data) => {
    setDatosExcel(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 print:p-0">
      
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
                <span className="text-sm text-gray-600">
                  ({datosExcel.length * 3} documentos: Fiel, Parroquia y Comunicación)
                </span>
              </div>
              <div className="flex space-x-3">
                <button 
                  onClick={() => window.print()}
                  className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition flex items-center"
                >
                  🖨️ Imprimir Documentos
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
      <div className="print:block mt-8 print:mt-0">
        {paginas.length === 0 && datosExcel.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-6xl mb-4">📄</div>
            <p className="text-gray-500">No hay datos para mostrar</p>
            <p className="text-sm text-gray-400 mt-2">
              Carga un archivo Excel para generar los documentos
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Se generan tres copias por registro: Certificado para el Fiel, Certificado para la Parroquia y Comunicación
            </p>
          </div>
        )}
        
        {paginas.map((pagina, index) => (
          <HojaA4 key={index}>
            <MitadHoja lineaCorte>
              <PlantillaComunicado data={pagina[0].data} tipo={pagina[0].tipo} />
            </MitadHoja>
            {pagina[1] && (
              <MitadHoja>
                <PlantillaComunicado data={pagina[1].data} tipo={pagina[1].tipo} />
              </MitadHoja>
            )}
          </HojaA4>
        ))}
      </div>
    </div>
  );
}
