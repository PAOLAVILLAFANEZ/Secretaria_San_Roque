import * as xlsx from 'xlsx';

// Columnas exactas que debe tener el Excel de Confirmaciones
export const PLANTILLA_CONFIRMACIONES = {
  'Apellido y Nombres': 'Ejemplo Apellido',
  'DNI': '12345678',
  'Localidad Nacimiento': 'Catamarca',
  'Fecha Nacimiento': '01/01/2000',
  'Padre': 'Padre Ejemplo',
  'Madre': 'Madre Ejemplo',
  'Domicilio': 'Calle Ejemplo 123',
  'Telefono': '3834567890',
  'Parroquia Bautismo': 'Santuario San Roque',
  'Diocesis Bautismo': 'Catamarca',
  'Fecha Bautismo': '01/01/2000',
  'Libro Bautismo': '1',
  'Folio Bautismo': '1',
  'Lugar Confirmacion': 'Santuario San Roque',
  'Fecha Confirmacion': '01/01/2024',
  'Delegado Celebrante': 'Mons. Ejemplo',
  'Padrino o Madrina': 'Padrino Ejemplo',
  'Libro Confirmacion': '1',
  'Folio Confirmacion': '1',
  'Acta Nro': '1',
  'Dia Emision': '01',
  'Mes Emision': 'Enero',
  'Anio Emision': '24'
};

const COLUMNAS_ANCHO = [
  { wch: 25 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 20 },
  { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 25 }, { wch: 20 },
  { wch: 15 }, { wch: 10 }, { wch: 10 }, { wch: 25 }, { wch: 15 },
  { wch: 25 }, { wch: 25 }, { wch: 10 }, { wch: 10 }, { wch: 10 },
  { wch: 10 }, { wch: 15 }, { wch: 10 }
];

export function exportarExcelConfirmaciones(filas, nombreArchivo = 'plantilla_confirmaciones.xlsx') {
  const wb = xlsx.utils.book_new();
  const ws = xlsx.utils.json_to_sheet(filas);
  ws['!cols'] = COLUMNAS_ANCHO;
  xlsx.utils.book_append_sheet(wb, ws, 'Confirmaciones');
  xlsx.writeFile(wb, nombreArchivo);
}
