import React from 'react';

export function HojaA4({ children }) {
  return (
    <div className="w-[210mm] h-[297mm] mx-auto bg-white flex flex-col break-after-page box-border overflow-hidden print:shadow-none shadow-xl mb-8 print:mb-0">
      {children}
    </div>
  );
}

export function MitadHoja({ children, lineaCorte = false }) {
  return (
    <div className={`flex-none w-full h-[148.5mm] p-8 box-border overflow-hidden ${lineaCorte ? 'border-b border-dashed border-gray-400' : ''}`}>
      {children}
    </div>
  );
}
