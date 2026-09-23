import React, { useState } from 'react';
import { HojaA4, MitadHoja } from '../common/PrintLayout';
import { PLANTILLA_CONFIRMACIONES, exportarExcelConfirmaciones } from '../confirmaciones/confirmacionesExcel';

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return '';
  const [year, month, day] = fechaStr.split('-');
  return `${day}/${month}/${year}`;
};

const generarNroCertificado = (fecha, libro, dni) => {
  if (!fecha || !libro || !dni) return '';
  const [year, month, day] = fecha.split('-');
  return `${year}-${month}-${day}-${libro}-${dni}`;
};

// ==========================================
// 1. CERTIFICADO DE PRIMERA COMUNIÓN (mismo formato que Confirmaciones)
// ==========================================
const CertificadoComunion = ({ data, tipo }) => {
  // tipo = 'fiel' o 'parroquia'
  const anotacion = tipo === 'fiel' ? 'Para el Fiel' : 'Para la Parroquia';

  return (
    <div className="flex flex-col h-full text-black font-sans text-[12px] leading-tight">
      
      {/* ===== ENCABEZADO ===== */}
      <div className="text-center mb-2">
        <h2 className="italic text-lg font-serif">Diócesis de Catamarca</h2>
        <p className="text-[11px]">Provincia de Catamarca - República Argentina</p>
        <h1 className="font-bold text-lg mt-0.5 tracking-wider">CERTIFICADO DE PRIMERA COMUNIÓN</h1>
        <p className="text-[11px] font-semibold italic mt-0.5">{anotacion}</p>
      </div>

      <div className="text-center mb-2">
        <div className="font-bold italic text-[13px]">Parroquia Santuario San Roque</div>
        <div className="text-[10px] font-semibold">
          Pje. Lucio Quiroga 91, La Chacarita - (4700) San Fernando del Valle de Catamarca - Tel. (+54) (383) 4859396
        </div>
      </div>

      <p className="mb-1 font-semibold">Certificamos que:</p>

      {/* ===== DATOS PERSONALES ===== */}
      <p className="font-bold mb-1 underline underline-offset-2">Datos personales</p>
      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">APELLIDO y Nombres:</span>
        <span className="flex-1 border-b border-black px-2 uppercase font-semibold">{data.apellidoNombres || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dni || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Lugar de nacimiento:</span>
        <span className="flex-[2] border-b border-black px-2">{data.lugarNacimiento || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha de Nacimiento:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.fechaNacimiento)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Padre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.padre || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dniPadre || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Madre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.madre || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dniMadre || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">{data.hijo || 'Hijo/Hija:'}</span>
        <span className="w-36 border-b border-black px-2">{data.hijoTexto || ''}</span>
        <span className="whitespace-nowrap mx-2">Domicilio:</span>
        <span className="flex-1 border-b border-black px-2">{data.domicilio || ''}</span>
        <span className="whitespace-nowrap mx-2">Tel.:</span>
        <span className="w-24 border-b border-black text-center">{data.telefono || ''}</span>
      </div>

      {/* ===== DATOS DE LA PRIMERA COMUNIÓN ===== */}
      <p className="font-bold mb-1 mt-1.5 underline underline-offset-2">Datos de la Primera Comunión</p>
      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Lugar:</span>
        <span className="flex-[2] border-b border-black px-2">{data.lugarComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.fechaComunion)}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Ministro celebrante:</span>
        <span className="flex-1 border-b border-black px-2">{data.ministroComunion || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Catequista:</span>
        <span className="flex-1 border-b border-black px-2">{data.catequista || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Padrino (Nombres y Apellido):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.padrino || ''}</span>
        <span className="whitespace-nowrap mx-2">Madrina:</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.madrina || ''}</span>
      </div>

      <div className="flex items-end mb-1">
        <span className="whitespace-nowrap mr-2">Libro:</span>
        <span className="w-14 border-b border-black text-center">{data.libroComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-14 border-b border-black text-center">{data.folioComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Certificado N°:</span>
        <span className="flex-1 border-b border-black text-center">{generarNroCertificado(data.fechaComunion, data.libroComunion, data.dni)}</span>
        <span className="whitespace-nowrap mx-2">Fecha:</span>
        <span className="w-20 border-b border-black text-center">{formatearFecha(data.fechaComunion)}</span>
      </div>

      {/* ===== PIE DE PÁGINA ===== */}
      <div className="flex justify-between items-end px-12 pb-2 mt-auto">
        {tipo === 'parroquia' ? (
          <div className="text-center w-24">
            <div className="w-14 h-14 mx-auto rounded-full border-2 border-black flex flex-col items-center justify-center text-[5px] font-bold leading-tight">
              <span className="text-[7px] tracking-widest">SELLO</span>
              <span>PARROQUIAL</span>
            </div>
          </div>
        ) : (
          <div className="w-24"></div>
        )}
        <div className="text-center w-64">
          <div className="border-b border-black h-4"></div>
          <div className="mt-1 font-semibold">{data.parroco || 'Pbro. _______________'}</div>
          <div className="text-[10px] font-semibold mt-0.5">Párroco</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 2. LEGAJO DEL CATEQUIZANDO (A4 completa)
// ==========================================
const LegajoComunion = ({ data }) => {
  return (
    <div className="flex flex-col h-full text-black font-sans text-[12px] leading-relaxed">
      
      {/* ===== ENCABEZADO ===== */}
      <div className="text-center mb-3">
        <h2 className="italic text-xl font-serif">Diócesis de Catamarca</h2>
        <p className="text-xs">Provincia de Catamarca - República Argentina</p>
        <h1 className="font-bold text-lg mt-1 tracking-wider">LEGAJO DEL CATEQUIZANDO - PRIMERA COMUNIÓN</h1>
      </div>

      <div className="text-center mb-3">
        <div className="font-bold italic text-[14px]">Parroquia Santuario San Roque</div>
        <div className="text-[11px] font-semibold">
          Pje. Lucio Quiroga 91, La Chacarita - (4700) San Fernando del Valle de Catamarca - Tel. (+54) (383) 4859396
        </div>
      </div>

      {/* ===== DATOS PERSONALES ===== */}
      <p className="font-bold mb-1.5 underline underline-offset-2">Datos personales</p>
      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">APELLIDO y Nombres:</span>
        <span className="flex-1 border-b border-black px-2 uppercase font-semibold">{data.apellidoNombres || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dni || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Lugar de nacimiento:</span>
        <span className="flex-[2] border-b border-black px-2">{data.lugarNacimiento || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha de Nacimiento:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.fechaNacimiento)}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Padre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.padre || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dniPadre || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Madre (Nombres y APELLIDO):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.madre || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{data.dniMadre || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">{data.hijo || 'Hijo/Hija:'}</span>
        <span className="w-36 border-b border-black px-2">{data.hijoTexto || ''}</span>
        <span className="whitespace-nowrap mx-2">Domicilio:</span>
        <span className="flex-1 border-b border-black px-2">{data.domicilio || ''}</span>
        <span className="whitespace-nowrap mx-2">Tel.:</span>
        <span className="w-24 border-b border-black text-center">{data.telefono || ''}</span>
      </div>

      {/* ===== DATOS DEL BAUTISMO ===== */}
      <p className="font-bold mb-1.5 mt-2 underline underline-offset-2">Datos del Bautismo</p>
      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Parroquia de Bautismo:</span>
        <span className="flex-1 border-b border-black px-2">{data.parroquiaBautismo || ''}</span>
        <span className="whitespace-nowrap mx-2">Diócesis:</span>
        <span className="flex-1 border-b border-black px-2">{data.diocesisBautismo || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Fecha de Bautismo:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.fechaBautismo)}</span>
        <span className="whitespace-nowrap mx-2">Libro:</span>
        <span className="w-20 border-b border-black text-center">{data.libroBautismo || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-20 border-b border-black text-center">{data.folioBautismo || ''}</span>
      </div>

      {/* ===== DATOS DE LA PRIMERA COMUNIÓN ===== */}
      <p className="font-bold mb-1.5 mt-2 underline underline-offset-2">Datos de la Primera Comunión</p>
      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Lugar:</span>
        <span className="flex-[2] border-b border-black px-2">{data.lugarComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.fechaComunion)}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Ministro celebrante:</span>
        <span className="flex-1 border-b border-black px-2">{data.ministroComunion || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Padrino (Nombres y Apellido):</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.padrino || ''}</span>
        <span className="whitespace-nowrap mx-2">Madrina:</span>
        <span className="flex-1 border-b border-black px-2 uppercase">{data.madrina || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Libro:</span>
        <span className="w-14 border-b border-black text-center">{data.libroComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-14 border-b border-black text-center">{data.folioComunion || ''}</span>
        <span className="whitespace-nowrap mx-2">Certificado N°:</span>
        <span className="flex-1 border-b border-black text-center">{generarNroCertificado(data.fechaComunion, data.libroComunion, data.dni)}</span>
        <span className="whitespace-nowrap mx-2">Fecha:</span>
        <span className="w-20 border-b border-black text-center">{formatearFecha(data.fechaComunion)}</span>
      </div>

      {/* ===== REGISTRO DE CATEQUESIS ===== */}
      <p className="font-bold mb-1.5 mt-2 underline underline-offset-2">Registro de Catequesis</p>
      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Catequista:</span>
        <span className="flex-1 border-b border-black px-2">{data.catequista || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Día de clases:</span>
        <span className="flex-1 border-b border-black px-2">{data.diaClases || ''}</span>
        <span className="whitespace-nowrap mx-2">Horario:</span>
        <span className="flex-1 border-b border-black px-2">{data.horario || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Día de Primera Confesión:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(data.diaPrimeraConfesion)}</span>
      </div>

      {/* ===== PIE DE PÁGINA ===== */}
      <div className="flex justify-between items-end px-12 pb-2 mt-auto">
        <div className="text-center w-64">
          <div className="border-b border-black h-4"></div>
          <div className="mt-1 font-semibold">{data.catequista || ''}</div>
          <div className="text-[11px] font-semibold mt-0.5">Catequista</div>
        </div>
        <div className="text-center w-64">
          <div className="border-b border-black h-4"></div>
          <div className="mt-1 font-semibold">{data.parroco || 'Pbro. _______________'}</div>
          <div className="text-[11px] font-semibold mt-0.5">Párroco</div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// 3. PÁGINA PRINCIPAL (Formulario Legajo + Impresión)
// ==========================================
const estadoInicial = {
  apellidoNombres: '', dni: '', lugarNacimiento: '', fechaNacimiento: '',
  padre: '', dniPadre: '', madre: '', dniMadre: '',
  hijo: 'Hijo/Hija:', hijoTexto: '',
  domicilio: '', telefono: '',
  parroquiaBautismo: '', diocesisBautismo: '', fechaBautismo: '', libroBautismo: '', folioBautismo: '',
  lugarComunion: '', fechaComunion: '', ministroComunion: '', catequista: '',
  padrino: '', madrina: '', libroComunion: '', folioComunion: '',
  diaClases: '', horario: '', diaPrimeraConfesion: '',
  parroco: ''
};

const clasesInput = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border';
const clasesLabel = 'block text-xs font-bold text-gray-700 uppercase';

export default function ComunionesPage() {
  const [formData, setFormData] = useState(estadoInicial);
  const [printMode, setPrintMode] = useState(null); // null | 'certificado' | 'legajo'
  const [isPrinting, setIsPrinting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const limpiarFormulario = () => {
    setFormData(estadoInicial);
    setPrintMode(null);
  };

  const handlePrint = (mode) => {
    setPrintMode(mode);
    setIsPrinting(true);
    
    setTimeout(() => {
      window.print();
      setIsPrinting(false);
      setPrintMode(null);
    }, 600);
  };

  const descargarExcelConfirmacion = () => {
    const mapeo = {
      'Apellido y Nombres': formData.apellidoNombres,
      'DNI': formData.dni,
      'Localidad Nacimiento': formData.lugarNacimiento,
      'Fecha Nacimiento': formatearFecha(formData.fechaNacimiento),
      'Padre': formData.padre,
      'Madre': formData.madre,
      'Domicilio': formData.domicilio,
      'Telefono': formData.telefono,
      'Parroquia Bautismo': formData.parroquiaBautismo,
      'Diocesis Bautismo': formData.diocesisBautismo,
      'Fecha Bautismo': formatearFecha(formData.fechaBautismo),
      'Libro Bautismo': formData.libroBautismo,
      'Folio Bautismo': formData.folioBautismo,
      'Padrino o Madrina': formData.padrino
    };

    const fila = {};
    Object.keys(PLANTILLA_CONFIRMACIONES).forEach((clave) => {
      fila[clave] = mapeo[clave] !== undefined ? mapeo[clave] : '';
    });

    const nombreBase = (formData.apellidoNombres || 'registro').trim().replace(/[^\wáéíóúñÁÉÍÓÚÑ]+/g, '_') || 'registro';
    exportarExcelConfirmaciones([fila], `confirmaciones_${nombreBase}.xlsx`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
      
      {/* Formulario Legajo */}
      <div className="max-w-4xl mx-auto print:hidden bg-white p-6 rounded-lg shadow-xl mb-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800 border-b pb-2">Legajo de Primera Comunión</h2>
        <p className="text-sm text-gray-500 mb-4">
          Los datos no se almacenan: completá el legajo, imprimí los documentos y descargá el Excel para usarlo luego en Confirmaciones.
        </p>

        <form onSubmit={(e) => { e.preventDefault(); handlePrint('certificado'); }} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
          
          <div className="md:col-span-2">
            <h3 className="font-bold text-gray-700 text-lg mt-2">Datos Personales</h3>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={clasesLabel}>Apellido y Nombres</label>
              <input type="text" name="apellidoNombres" value={formData.apellidoNombres} onChange={handleChange} className={clasesInput} />
            </div>
            <div>
              <label className={clasesLabel}>D.N.I.</label>
              <input type="text" name="dni" value={formData.dni} onChange={handleChange} className={clasesInput} />
            </div>
          </div>

          <div>
            <label className={clasesLabel}>Lugar de Nacimiento</label>
            <input type="text" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Fecha de Nacimiento</label>
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} className={clasesInput} />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={clasesLabel}>Padre (Nombres y APELLIDO)</label>
              <input type="text" name="padre" value={formData.padre} onChange={handleChange} className={clasesInput} />
            </div>
            <div>
              <label className={clasesLabel}>D.N.I. del Padre</label>
              <input type="text" name="dniPadre" value={formData.dniPadre} onChange={handleChange} className={clasesInput} />
            </div>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={clasesLabel}>Madre (Nombres y APELLIDO)</label>
              <input type="text" name="madre" value={formData.madre} onChange={handleChange} className={clasesInput} />
            </div>
            <div>
              <label className={clasesLabel}>D.N.I. de la Madre</label>
              <input type="text" name="dniMadre" value={formData.dniMadre} onChange={handleChange} className={clasesInput} />
            </div>
          </div>

          <div>
            <label className={clasesLabel}>Etiqueta (Ej: Hijo/Hija)</label>
            <input type="text" name="hijo" value={formData.hijo} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Valor (Ej: María)</label>
            <input type="text" name="hijoTexto" value={formData.hijoTexto} onChange={handleChange} className={clasesInput} />
          </div>

          <div>
            <label className={clasesLabel}>Domicilio</label>
            <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Teléfono</label>
            <input type="text" name="telefono" value={formData.telefono} onChange={handleChange} className={clasesInput} />
          </div>

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-bold text-gray-700 text-lg">Datos del Bautismo</h3>
          </div>

          <div>
            <label className={clasesLabel}>Parroquia de Bautismo</label>
            <input type="text" name="parroquiaBautismo" value={formData.parroquiaBautismo} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Diócesis</label>
            <input type="text" name="diocesisBautismo" value={formData.diocesisBautismo} onChange={handleChange} className={clasesInput} />
          </div>

          <div>
            <label className={clasesLabel}>Fecha de Bautismo</label>
            <input type="date" name="fechaBautismo" value={formData.fechaBautismo} onChange={handleChange} className={clasesInput} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={clasesLabel}>Libro</label>
              <input type="text" name="libroBautismo" value={formData.libroBautismo} onChange={handleChange} className={clasesInput} />
            </div>
            <div>
              <label className={clasesLabel}>Folio</label>
              <input type="text" name="folioBautismo" value={formData.folioBautismo} onChange={handleChange} className={clasesInput} />
            </div>
          </div>

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-bold text-gray-700 text-lg">Datos de la Primera Comunión</h3>
          </div>

          <div>
            <label className={clasesLabel}>Lugar</label>
            <input type="text" name="lugarComunion" value={formData.lugarComunion} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Fecha</label>
            <input type="date" name="fechaComunion" value={formData.fechaComunion} onChange={handleChange} className={clasesInput} />
          </div>

          <div className="md:col-span-2">
            <label className={clasesLabel}>Ministro celebrante</label>
            <input type="text" name="ministroComunion" value={formData.ministroComunion} onChange={handleChange} className={clasesInput} />
          </div>

          <div>
            <label className={clasesLabel}>Padrino</label>
            <input type="text" name="padrino" value={formData.padrino} onChange={handleChange} className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Madrina</label>
            <input type="text" name="madrina" value={formData.madrina} onChange={handleChange} className={clasesInput} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={clasesLabel}>Libro</label>
              <input type="text" name="libroComunion" value={formData.libroComunion} onChange={handleChange} className={clasesInput} />
            </div>
            <div>
              <label className={clasesLabel}>Folio</label>
              <input type="text" name="folioComunion" value={formData.folioComunion} onChange={handleChange} className={clasesInput} />
            </div>
          </div>

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <h3 className="font-bold text-gray-700 text-lg">Registro de Catequesis</h3>
          </div>

          <div className="md:col-span-2">
            <label className={clasesLabel}>Catequista</label>
            <input type="text" name="catequista" value={formData.catequista} onChange={handleChange} className={clasesInput} />
          </div>

          <div>
            <label className={clasesLabel}>Día de clases</label>
            <input type="text" name="diaClases" value={formData.diaClases} onChange={handleChange} placeholder="Ej: Sábados" className={clasesInput} />
          </div>
          <div>
            <label className={clasesLabel}>Horario</label>
            <input type="text" name="horario" value={formData.horario} onChange={handleChange} placeholder="Ej: 15:00 a 17:00" className={clasesInput} />
          </div>

          <div className="md:col-span-2">
            <label className={clasesLabel}>Día de Primera Confesión</label>
            <input type="date" name="diaPrimeraConfesion" value={formData.diaPrimeraConfesion} onChange={handleChange} className={clasesInput} />
          </div>

          <div className="md:col-span-2 border-t pt-4 mt-2">
            <div>
              <label className={clasesLabel}>Párroco (Nombre completo)</label>
              <input type="text" name="parroco" value={formData.parroco} onChange={handleChange} placeholder="Ej: Pbro. Lic. Carlos R. Figueroa Arteaga" className={clasesInput} />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 mt-6">
            <button type="button" onClick={limpiarFormulario} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-bold">Limpiar</button>
            <button type="submit" className="bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 font-bold shadow-lg">🖨️ Generar Certificado</button>
          </div>
        </form>

        {/* Acciones adicionales del legajo */}
        <div className="mt-4 pt-4 border-t flex flex-wrap justify-end gap-3">
          <button
            onClick={() => handlePrint('legajo')}
            className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 font-bold"
          >
            🖨️ Imprimir Legajo
          </button>
          <button
            onClick={descargarExcelConfirmacion}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 font-bold"
          >
            📥 Descargar Excel para Confirmación
          </button>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            <strong>Consejo:</strong> El Excel descargado lleva los datos de este legajo. Completá los datos de
            Confirmación (lugar, fecha, delegado, libro y folio), agregá más filas si lo necesitás y súbelo en la
            página de Confirmaciones para imprimir los certificados (Fiel, Parroquia) y la Comunicación.
          </p>
        </div>
      </div>

      {/* Loader */}
      {isPrinting && (
        <div className="print:hidden text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto"></div>
          <p className="mt-3 text-gray-700 font-bold">Preparando documentos para impresión...</p>
        </div>
      )}

      {/* ===== VISTA DE IMPRESIÓN ===== */}
      <div className="print:block mt-8 print:mt-0">
        {printMode === 'certificado' && (
          <HojaA4>
            {/* Certificado 1: Para la Parroquia (CON sello) */}
            <MitadHoja lineaCorte>
              <CertificadoComunion data={formData} tipo="parroquia" />
            </MitadHoja>

            {/* Certificado 2: Para el Fiel (SIN sello) */}
            <MitadHoja>
              <CertificadoComunion data={formData} tipo="fiel" />
            </MitadHoja>
          </HojaA4>
        )}

        {printMode === 'legajo' && (
          <HojaA4>
            <div className="flex-1 min-h-0 w-full p-8 box-border overflow-hidden">
              <LegajoComunion data={formData} />
            </div>
          </HojaA4>
        )}
      </div>
    </div>
  );
}
