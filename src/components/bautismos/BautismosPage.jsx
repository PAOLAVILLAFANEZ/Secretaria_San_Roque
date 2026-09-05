import React, { useState } from 'react';

// ==========================================
// 1. CERTIFICADO DE BAUTISMO (A5 - 148.5mm x 210mm)
// ==========================================
const CertificadoBautismo = ({ data, tipo }) => {
  // tipo = 'fiel' o 'parroquia'

  const formatearFecha = (fechaStr) => {
    if (!fechaStr) return '';
    const [year, month, day] = fechaStr.split('-');
    return `${day}/${month}/${year}`;
  };

  // Formato del certificado: Año-Mes-Día-Libro-NroCert
  const generarNroCertificado = () => {
    if (!data.fechaBautismo || !data.libro || !data.dni) return '';
    const fechaParts = data.fechaBautismo.split('-');
    return `${fechaParts[0]}-${fechaParts[1]}-${fechaParts[2]}-${data.libro}-${data.dni}`;
  };

  return (
    <div className="relative w-[210mm] h-[148.5mm] bg-white p-6 box-border flex flex-col text-[10px] font-serif leading-relaxed overflow-hidden select-none">
      
      {/* ===== ENCABEZADO ===== */}
      <div className="text-center w-full">
        <h1 className="text-lg font-bold tracking-widest text-black uppercase">DIÓCESIS DE CATAMARCA</h1>
        <h2 className="text-[10px] font-bold text-black uppercase">Provincia de Catamarca - República Argentina</h2>
        
        <div className="flex justify-center my-1">
          <span className="text-[10px] tracking-[0.5em]">********</span>
        </div>
        
        <h3 className="text-base font-bold text-black uppercase tracking-wider mt-1">CERTIFICADO DE BAUTISMO</h3>
        
        <div className="mt-2">
          <p className="font-bold text-[11px] uppercase tracking-wide">PARROQUIA SANTUARIO SAN ROQUE</p>
          <p className="text-[7px] text-black font-medium">Pje. Lucio Quiroga 91 – (4700) San Fernando del Valle de Catamarca – Tel. (+54) (383) 4859396</p>
        </div>
      </div>

      {/* ===== CUERPO ===== */}
      <div className="w-full text-left mt-3 flex-1">
        
        {/* Datos Personales */}
        <p className="font-bold text-[10px] mb-1 underline underline-offset-2">Datos personales</p>
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">APELLIDO y Nombres:</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px] uppercase">{data.apellidoNombres || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">D. N. I.:</span>
            <span className="w-24 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.dni || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Lugar de nacimiento:</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.lugarNacimiento || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">Fecha de Nacimiento:</span>
            <span className="w-24 border-b border-black ml-1 h-5 px-1 text-[9px]">{formatearFecha(data.fechaNacimiento)}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Padre (Nombres y APELLIDO):</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px] uppercase">{data.padre || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">D. N. I.:</span>
            <span className="w-24 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.dniPadre || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Madre (Nombres y APELLIDO):</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px] uppercase">{data.madre || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">D. N. I.:</span>
            <span className="w-24 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.dniMadre || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">{data.hijo || 'Hija legítima:'}</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.hijoTexto || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">Domicilio:</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.domicilio || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">Tel.:</span>
            <span className="w-20 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.telefono || ''}</span>
          </div>
        </div>

        {/* Datos del Bautismo */}
        <p className="font-bold text-[10px] mt-2 mb-1 underline underline-offset-2">Datos del Bautismo</p>
        <div className="space-y-1">
          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Lugar:</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.lugarBautismo || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">Fecha:</span>
            <span className="w-24 border-b border-black ml-1 h-5 px-1 text-[9px]">{formatearFecha(data.fechaBautismo)}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Ministro celebrante:</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.ministro || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Padrino (Nombres y Apellido):</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px] uppercase">{data.padrino || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Madrina (Nombres y Apellido):</span>
            <span className="flex-1 border-b border-black ml-1 h-5 px-1 text-[9px] uppercase">{data.madrina || ''}</span>
          </div>

          <div className="flex items-center">
            <span className="font-bold whitespace-nowrap text-[9px]">Libro:</span>
            <span className="w-16 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.libro || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-4">Folio:</span>
            <span className="w-16 border-b border-black ml-1 h-5 px-1 text-[9px]">{data.folio || ''}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-4">Certificado N°:</span>
            <span className="w-32 border-b border-black ml-1 h-5 px-1 text-[9px]">{generarNroCertificado()}</span>
            <span className="font-bold whitespace-nowrap text-[9px] ml-2">Fecha:</span>
            <span className="w-20 border-b border-black ml-1 h-5 px-1 text-[9px]">{formatearFecha(data.fechaBautismo)}</span>
          </div>
        </div>
      </div>

      {/* ===== PIE DE PÁGINA ===== */}
      <div className="mt-auto pt-2 flex justify-between items-end">
        {/* Sello - Solo para la versión Parroquia */}
        {tipo === 'parroquia' && (
          <div className="w-24 h-24 flex items-center justify-center">
            <div className="w-[72px] h-[72px] rounded-full border-2 border-black flex flex-col items-center justify-center text-[5px] font-bold leading-tight p-1 relative">
              <div className="absolute w-[68px] h-[68px] rounded-full border border-black border-dashed"></div>
              <span className="text-[7px] tracking-widest">SELLO</span>
              <span className="text-[5px] mt-0.5">PARROQUIAL</span>
            </div>
          </div>
        )}
        
        {/* Espacio flexible para alinear */}
        {tipo === 'fiel' && <div className="w-24"></div>}
        
        <div className="flex-1"></div>

        {/* Firma y texto final */}
        <div className="text-right">
          <div className="w-48 border-t-2 border-black pt-0.5 text-[8px] font-bold uppercase tracking-wide">
            {data.parroco || 'Pbro. _______________'}
          </div>
          <div className="text-[7px] font-bold mt-0.5">Párroco</div>
          <div className="text-[7px] font-bold mt-1">Para el fiel</div>
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
    hijo: 'Hija legítima:', hijoTexto: '',
    domicilio: '', telefono: '',
    lugarBautismo: '', fechaBautismo: '', ministro: '', padrino: '', madrina: '', 
    libro: '', folio: '', parroco: ''
  });

  const [isPrinting, setIsPrinting] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      hijo: 'Hija legítima:', hijoTexto: '',
      domicilio: '', telefono: '',
      lugarBautismo: '', fechaBautismo: '', ministro: '', padrino: '', madrina: '', 
      libro: '', folio: '', parroco: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      
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
              <label className="block text-xs font-bold text-gray-700 uppercase">Etiqueta (Ej: Hija legítima)</label>
              <input type="text" name="hijo" value={formData.hijo} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase">Valor (Ej: María)</label>
              <input type="text" name="hijoTexto" value={formData.hijoTexto} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
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

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-700 uppercase">Párroco (Nombre completo)</label>
              <input type="text" name="parroco" value={formData.parroco} onChange={handleChange} placeholder="Ej: Pbro. Lic. Carlos R. Figueroa Arteaga" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border" />
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
      <div className="print:block mt-8">
        {!showForm && (
          <div className="w-[210mm] h-[297mm] mx-auto bg-white flex flex-col box-border overflow-hidden shadow-2xl print:shadow-none mb-10 print:mb-0">
            
            {/* Certificado 1: Para la Parroquia (CON sello) */}
            <div className="h-[148.5mm] w-full border-b-2 border-dashed border-gray-300 flex items-center justify-center relative">
              <CertificadoBautismo data={formData} tipo="parroquia" />
            </div>

            {/* Certificado 2: Para el Fiel (SIN sello) */}
            <div className="h-[148.5mm] w-full flex items-center justify-center relative">
              <CertificadoBautismo data={formData} tipo="fiel" />
            </div>

          </div>
        )}
      </div>
    </div>
  );
}