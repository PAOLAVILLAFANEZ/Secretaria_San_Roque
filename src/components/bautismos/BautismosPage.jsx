import { useState } from 'react';
import { HojaA4, MitadHoja } from '../common/PrintLayout';

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return '';
  const [year, month, day] = fechaStr.split('-');
  return `${day}/${month}/${year}`;
};

const generarNroCertificado = (fecha, libro, orden) => {
  if (!fecha || !libro || !orden) return '';
  const compacto = fecha.replace(/-/g, '');
  const ordenTexto = String(orden).padStart(2, '0');
  return `${compacto}-${ordenTexto}/${libro}-`;
};

const EXCEPCIONES_MINUSCULA = new Set(['de', 'del', 'los', 'la', 'las']);

const formatearTitulo = (texto) =>
  texto
    .split(/\s+/)
    .map((palabra) => {
      const limpia = palabra.toLowerCase();
      return EXCEPCIONES_MINUSCULA.has(limpia)
        ? limpia
        : limpia.charAt(0).toUpperCase() + limpia.slice(1);
    })
    .join(' ');

const formatearApellidoNombres = (valor) => {
  const texto = String(valor ?? '').trim();
  if (!texto) return '';
  const [apellido, ...resto] = texto.split(',');
  const nombres = resto.join(',').trim();
  const apellidoFormateado = apellido.trim().toUpperCase();
  if (!nombres) return apellidoFormateado;
  return `${apellidoFormateado}, ${formatearTitulo(nombres)}`;
};

const formatearNombresApellido = (valor) => {
  const texto = String(valor ?? '').trim();
  if (!texto) return '';
  const [nombres, ...resto] = texto.split(',');
  const apellido = resto.join(',').trim();
  const nombresFormateados = formatearTitulo(nombres);
  if (!apellido) return nombresFormateados;
  return `${nombresFormateados}, ${apellido.toUpperCase()}`;
};

// ==========================================
// 1. CERTIFICADO DE BAUTISMO (mismo formato que Confirmaciones)
// ==========================================
const CertificadoBautismo = ({ data, tipo }) => {
  // tipo = 'fiel' o 'parroquia'
  const anotacion = tipo === 'fiel' ? 'Para el Fiel' : 'Para la Parroquia';

  return (
    <div className="flex flex-col h-full text-black font-sans text-[12px] leading-tight">
      
      {/* ===== ENCABEZADO ===== */}
      <div className="text-center mb-2">
        <h2 className="italic text-lg font-serif">Diócesis de Catamarca</h2>
        <p className="text-[11px]">Provincia de Catamarca - República Argentina</p>
        <h1 className="font-bold text-lg mt-0.5 tracking-wider">CERTIFICADO DE BAUTISMO</h1>
      </div>

      <div className="text-center mb-2">
        <div className="font-bold italic text-[13px]">Parroquia Santuario San Roque</div>
        <div className="text-[10px] font-semibold">
          Pje. Lucio Quiroga 91, La Chacarita - (4700) San Fernando del Valle de Catamarca - Tel. (+54) (383) 4859396
        </div>
      </div>

      {/* ===== DATOS PERSONALES ===== */}
      <p className="font-bold mb-1 underline underline-offset-2">Datos personales</p>
      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">APELLIDO y Nombres:</span>
        <span className="flex-1 border-b border-black px-2 font-semibold">{formatearApellidoNombres(data.apellidoNombres)}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black px-2">{data.dni || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Lugar de nacimiento:</span>
        <span className="flex-[2] border-b border-black px-2">{formatearTitulo(data.lugarNacimiento)}</span>
        <span className="whitespace-nowrap mx-2">Fecha de Nacimiento:</span>
        <span className="flex-1 border-b border-black px-2">{formatearFecha(data.fechaNacimiento)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Padre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2">{formatearNombresApellido(data.padre)}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black px-2">{data.dniPadre || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Madre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2">{formatearNombresApellido(data.madre)}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black px-2">{data.dniMadre || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Hijo/a:</span>
        <span className="w-36 border-b border-black px-2">{data.hijo || ''}</span>
        <span className="whitespace-nowrap mx-2">Domicilio:</span>
        <span className="flex-1 border-b border-black px-2">{formatearTitulo(data.domicilio)}</span>
        <span className="whitespace-nowrap mx-2">Tel.:</span>
        <span className="w-24 border-b border-black px-2">{data.telefono || ''}</span>
      </div>

      {/* ===== DATOS DEL BAUTISMO ===== */}
      <p className="font-bold mb-1 mt-1.5 underline underline-offset-2">Datos del Bautismo</p>
      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Lugar:</span>
        <span className="flex-[2] border-b border-black px-2">{formatearTitulo(data.lugarBautismo)}</span>
        <span className="whitespace-nowrap mx-2">Fecha:</span>
        <span className="flex-1 border-b border-black px-2">{formatearFecha(data.fechaBautismo)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Ministro celebrante:</span>
        <span className="flex-1 border-b border-black px-2">{formatearTitulo(data.ministro)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Padrino (Nombres y Apellido):</span>
        <span className="flex-1 border-b border-black px-2">{formatearTitulo(data.padrino)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Madrina (Nombres y Apellido):</span>
        <span className="flex-1 border-b border-black px-2">{formatearTitulo(data.madrina)}</span>
      </div>

      <div className="mb-1 grid w-max grid-cols-[auto] items-end gap-y-1.5">
        <div className="flex items-end">
          <span className="whitespace-nowrap mr-2">Libro:</span>
          <span className="w-14 border-b border-black px-2">{data.libro || ''}</span>
          <span className="whitespace-nowrap ml-2 mr-2">Folio:</span>
          <span className="w-14 border-b border-black px-2">{data.folio || ''}</span>
        </div>

        <div className="flex items-end">
          <span className="whitespace-nowrap">Certificado N°:</span>
          <span className="min-w-0 flex-1 border-b border-black px-2">{generarNroCertificado(data.fechaBautismo, data.libro, data.orden)}</span>
        </div>
      </div>

      {/* ===== PIE DE PÁGINA ===== */}
      <div className="flex justify-between items-end px-12 pb-2 mt-auto">
        <div className="text-[11px] font-semibold italic">{anotacion}</div>
        <div className="text-center w-64">
          <div className="border-b border-dotted border-black h-4"></div>
          <div className="text-[10px] font-semibold mt-0.5">Párroco</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. PÁGINA PRINCIPAL (Formulario + Impresión A4)
// ==========================================
export default function BautismosPage() {
  const [formData, setFormData] = useState({
    apellidoNombres: '', dni: '', lugarNacimiento: '', fechaNacimiento: '',
    padre: '', dniPadre: '', madre: '', dniMadre: '',
    hijo: '-',
    domicilio: '', telefono: '',
    lugarBautismo: '', fechaBautismo: '', ministro: '', padrino: '', madrina: '',
    libro: '', folio: '', orden: ''
  });

  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nuevoValor = value;
    if (name === 'libro' || name === 'folio' || name === 'orden') {
      nuevoValor = value.replace(/\D/g, '');
    }
    if (name === 'dni' || name === 'dniPadre' || name === 'dniMadre') {
      nuevoValor = value.replace(/[^\d.]/g, '');
    }
    setFormData(prev => ({ ...prev, [name]: nuevoValor }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setIsPrinting(true);
    
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
      setShowForm(true);
    }, 600);
  };

  const limpiarFormulario = () => {
    setFormData({
      apellidoNombres: '', dni: '', lugarNacimiento: '', fechaNacimiento: '',
      padre: '', dniPadre: '', madre: '', dniMadre: '',
      hijo: '-',
      domicilio: '', telefono: '',
      lugarBautismo: '', fechaBautismo: '', ministro: '', padrino: '', madrina: '',
      libro: '', folio: '', orden: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
      
      {/* Formulario de Ingreso */}
      {showForm && (
        <div className="max-w-4xl mx-auto print:hidden bg-white p-6 rounded-lg shadow-xl mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">Ingreso de Datos para Certificado de Bautismo</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            
            <div className="md:col-span-2">
              <h3 className="font-bold text-gray-700 text-lg mt-2">Datos Personales</h3>
            </div>
            
            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Apellido y Nombres</label>
                <input type="text" name="apellidoNombres" value={formData.apellidoNombres} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">D.N.I.</label>
                <input type="text" name="dni" value={formData.dni} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Lugar de Nacimiento</label>
              <input type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Fecha de Nacimiento</label>
              <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Padre (Nombres y APELLIDO)</label>
                <input type="text" name="padre" value={formData.padre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">D.N.I. del Padre</label>
                <input type="text" name="dniPadre" value={formData.dniPadre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">Madre (Nombres y APELLIDO)</label>
                <input type="text" name="madre" value={formData.madre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase">D.N.I. de la Madre</label>
                <input type="text" name="dniMadre" value={formData.dniMadre} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Etiqueta (Hijo/a)</label>
              <select name="hijo" value={formData.hijo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border">
                <option value="Legítimo">Legítimo</option>
                <option value="Legítima">Legítima</option>
                <option value="-">-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Domicilio</label>
              <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Teléfono</label>
              <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div className="md:col-span-2 border-t pt-4 mt-2">
              <h3 className="font-bold text-gray-700 text-lg">Datos del Bautismo</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Lugar</label>
              <input type="text" name="lugarBautismo" value={formData.lugarBautismo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Fecha</label>
              <input type="date" name="fechaBautismo" value={formData.fechaBautismo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Ministro celebrante</label>
              <input type="text" name="ministro" value={formData.ministro} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Padrino</label>
              <input type="text" name="padrino" value={formData.padrino} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Madrina</label>
              <input type="text" name="madrina" value={formData.madrina} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Libro</label>
              <input type="text" name="libro" value={formData.libro} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Folio</label>
              <input type="text" name="folio" value={formData.folio} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Orden (solo para Certificado N°)</label>
              <input type="text" name="orden" value={formData.orden} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-6">
              <button type="button" onClick={limpiarFormulario} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-bold">Limpiar</button>
              <button type="submit" className="bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 font-bold shadow-lg">🖨️ Generar Certificado</button>
            </div>
          </form>
        </div>
      )}

      {/* Loader */}
      {isPrinting && (
        <div className="print:hidden text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-3 text-gray-700 font-bold">Preparando certificados para impresión...</p>
        </div>
      )}

      {/* ===== HOJA A4 DE IMPRESIÓN ===== */}
      <div className="print:block mt-8 print:mt-0">
        {!showForm && (
          <HojaA4>
            {/* Certificado 1: Para la Parroquia (CON sello) */}
            <MitadHoja lineaCorte>
              <CertificadoBautismo data={formData} tipo="parroquia" />
            </MitadHoja>

            {/* Certificado 2: Para el Fiel (SIN sello) */}
            <MitadHoja>
              <CertificadoBautismo data={formData} tipo="fiel" />
            </MitadHoja>
          </HojaA4>
        )}
      </div>
    </div>
  );
}
