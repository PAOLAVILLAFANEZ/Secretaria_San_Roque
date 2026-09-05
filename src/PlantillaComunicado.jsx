import React from 'react';

export default function PlantillaComunicado({ data }) {
  if (!data) return null;

  return (
    <div className="flex flex-col h-full text-black font-sans text-[13px] leading-tight">
      
      {/* Encabezado */}
      <div className="text-center mb-4 relative">
        <h2 className="italic text-xl font-serif">Diócesis de Catamarca</h2>
        <p className="text-xs">Provincia de Catamarca - República Argentina</p>
        <h1 className="font-bold text-xl mt-1 tracking-wider">COMUNICADO DE CONFIRMACIÓN</h1>
        
        {/* Número de Acta alineado a la derecha */}
        <div className="absolute right-0 bottom-0 text-xs flex items-end">
          <span className="mr-2">Acta de Confirmación Nro. C</span>
          <span className="w-12 border-b border-black text-center">{data['Acta Nro'] || ''}</span>
          <span className="mx-1">-</span>
          <span className="w-8 border-b border-black"></span>
          <span className="mx-1">/</span>
          <span className="w-8 border-b border-black"></span>
          <span className="mx-1">-</span>
          <span className="w-8 border-b border-black"></span>
        </div>
      </div>

      {/* Datos de la Parroquia */}
      <div className="font-bold italic text-base">Parroquia Santuario San Roque</div>
      <div className="text-xs font-bold mb-3">
        Padre Lucio Quiroga 91, La Chacarita - (4700) San Fernando del Valle de Catamarca - Tel. (0054) (0383) 4859396
      </div>
      
      <p className="mb-2 font-semibold">Comunicamos que:</p>

      {/* --- SECCIÓN 1: DATOS PERSONALES --- */}
      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">APELLIDO y Nombres:</span>
        <span className="flex-1 border-b border-black px-2 uppercase font-semibold">{data['Apellido y Nombres'] || ''}</span>
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-32 border-b border-black text-center">{data['DNI'] || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Localidad de nacimiento:</span>
        <span className="flex-[2] border-b border-black px-2">{data['Localidad Nacimiento'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha de nacimiento:</span>
        <span className="flex-1 border-b border-black text-center">{data['Fecha Nacimiento'] || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Padre:</span>
        <span className="flex-1 border-b border-black px-2">{data['Padre'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Madre:</span>
        <span className="flex-1 border-b border-black px-2">{data['Madre'] || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Domicilio:</span>
        <span className="flex-1 border-b border-black px-2">{data['Domicilio'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Tel.:</span>
        <span className="w-32 border-b border-black text-center">{data['Telefono'] || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Parroquia de Bautismo:</span>
        <span className="flex-1 border-b border-black px-2">{data['Parroquia Bautismo'] || ''}</span>
      </div>

      <div className="flex items-end mb-4">
        <span className="whitespace-nowrap mr-2">Diócesis:</span>
        <span className="flex-[2] border-b border-black px-2">{data['Diocesis Bautismo'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha de Bautismo:</span>
        <span className="flex-1 border-b border-black text-center">{data['Fecha Bautismo'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Libro:</span>
        <span className="w-16 border-b border-black text-center">{data['Libro Bautismo'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-16 border-b border-black text-center">{data['Folio Bautismo'] || ''}</span>
      </div>

      {/* --- SECCIÓN 2: DATOS DE CONFIRMACIÓN --- */}
      <div className="font-bold mb-2">Recibió el Sacramento de la Confirmación en esta Parroquia según los siguientes Datos:</div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Lugar:</span>
        <span className="flex-[2] border-b border-black px-2">{data['Lugar Confirmacion'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Fecha de Confirmación:</span>
        <span className="flex-1 border-b border-black text-center">{data['Fecha Confirmacion'] || ''}</span>
      </div>

      <div className="flex items-end mb-1.5">
        <span className="whitespace-nowrap mr-2">Ordinario o Delegado celebrante:</span>
        <span className="flex-1 border-b border-black px-2">{data['Delegado Celebrante'] || ''}</span>
      </div>

      <div className="flex items-end mb-4">
        <span className="whitespace-nowrap mr-2">Padrino o Madrina:</span>
        <span className="flex-1 border-b border-black px-2">{data['Padrino o Madrina'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Libro de Confirmaciones: O</span>
        <span className="w-16 border-b border-black text-center">{data['Libro Confirmacion'] || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-16 border-b border-black text-center">{data['Folio Confirmacion'] || ''}</span>
      </div>

      {/* --- SECCIÓN 3: PIE DE PÁGINA (FECHA Y FIRMAS) --- */}
      <div className="flex justify-end items-end mb-8 mt-auto">
        <span className="w-10 border-b border-black text-center">{data['Dia Emision'] || ''}</span>
        <span className="mx-2">de</span>
        <span className="w-24 border-b border-black text-center">{data['Mes Emision'] || ''}</span>
        <span className="mx-2">de 20</span>
        <span className="w-8 border-b border-black text-center">{data['Anio Emision'] || ''}</span>
      </div>

      <div className="flex justify-between items-end px-12 pb-4">
        <div className="text-center w-24">
          <div className="h-4"></div>
          <div className="border-t border-black mt-1">Sello</div>
        </div>
        <div className="text-center w-64">
          <div className="border-b border-black h-4"></div>
          <div className="mt-1">Párroco</div>
        </div>
      </div>

    </div>
  );
}