import { useState } from 'react';
import * as xlsx from 'xlsx';
import { PLANTILLA_CONFIRMACIONES, exportarExcelConfirmaciones } from './confirmacionesExcel';

export default function ExcelGenerator({ onDataLoaded }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Validar tipo de archivo
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel'
    ];
    
    if (!validTypes.includes(selectedFile.type)) {
      setError('Por favor, selecciona un archivo Excel válido (.xlsx o .xls)');
      return;
    }
    
    setError('');
    procesarArchivo(selectedFile);
  };

  const procesarArchivo = (file) => {
    setLoading(true);
    setError('');

    const reader = new FileReader();
    reader.onload = (evento) => {
      try {
        const data = new Uint8Array(evento.target.result);
        const workbook = xlsx.read(data, { type: 'array' });
        
        const nombrePrimeraHoja = workbook.SheetNames[0];
        const hoja = workbook.Sheets[nombrePrimeraHoja];
        const jsonDatos = xlsx.utils.sheet_to_json(hoja);
        
        if (jsonDatos.length === 0) {
          setError('El archivo Excel está vacío o no tiene el formato correcto');
          setLoading(false);
          return;
        }
        
        onDataLoaded(jsonDatos);
        setLoading(false);
      } catch {
        setError('Error al procesar el archivo. Verifica que sea un Excel válido.');
        setLoading(false);
      }
    };
    
    reader.onerror = () => {
      setError('Error al leer el archivo');
      setLoading(false);
    };
    
    reader.readAsArrayBuffer(file);
  };

  const descargarPlantilla = () => {
    exportarExcelConfirmaciones([PLANTILLA_CONFIRMACIONES]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Cargar Datos desde Excel</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Seleccionar archivo Excel
          </label>
          <input 
            type="file" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange} 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            disabled={loading}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
            <p className="text-sm">{error}</p>
          </div>
        )}

        {loading && (
          <div className="flex items-center justify-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Procesando archivo...</span>
          </div>
        )}

        <div className="flex space-x-4">
          <button
            onClick={descargarPlantilla}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition flex-1"
          >
            📥 Descargar Plantilla
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Consejo:</strong> Descarga la plantilla, completa los datos y súbela para generar los documentos.
            También podés exportar un Excel con tus datos ya cargados desde la página de Comuniones.
            El archivo debe tener las columnas exactas que muestra la plantilla.
          </p>
        </div>
      </div>
    </div>
  );
}
