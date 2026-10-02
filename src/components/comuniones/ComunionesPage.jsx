import { useEffect, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { HojaA4 } from '../common/PrintLayout';
import {
  crearLegajo,
  actualizarLegajo,
  eliminarLegajo,
  buscarLegajos,
  exportarJSON,
  importarJSON
} from '../../db/legajosDB';
import { LEGAJO_VACIO, calcularEdad, validarLegajo } from '../../utils/legajoSchema';

const clasesInput = 'mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 sm:text-sm p-2 border';
const clasesLabel = 'block text-xs font-bold text-gray-700 uppercase';

const formatearFecha = (fechaStr) => {
  if (!fechaStr) return '';
  const [year, month, day] = fechaStr.split('-');
  return `${day}/${month}/${year}`;
};

const formatearTimestamp = (iso) => {
  if (!iso) return '';
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return '';
  return `${String(fecha.getDate()).padStart(2, '0')}/${String(fecha.getMonth() + 1).padStart(2, '0')}/${fecha.getFullYear()}`;
};

const copiarLegajo = (legajo) => JSON.parse(JSON.stringify(legajo));

function Fila({ children }) {
  return <div className="flex items-end mb-1.5">{children}</div>;
}

function Campo({ etiqueta, valor, ancho = 'flex-1', centrado = false }) {
  return (
    <>
      <span className="whitespace-nowrap mr-2">{etiqueta}</span>
      <span className={`${ancho} border-b border-black px-2 ${centrado ? 'text-center' : ''}`}>{valor || ''}</span>
    </>
  );
}

function TituloSeccion({ children }) {
  return <p className="font-bold mb-1.5 mt-2 underline underline-offset-2">{children}</p>;
}

function VistaLegajoImpresion({ legajo }) {
  const nombreCompleto = [legajo.apellidos, legajo.nombres].filter(Boolean).join(', ');
  const edad = calcularEdad(legajo.fechaNacimiento);

  return (
    <div className="flex flex-col h-full text-black font-sans text-[12px] leading-relaxed">
      <div className="text-center mb-3">
        <p className="text-xs">Provincia de Catamarca - República Argentina</p>
        <h1 className="font-bold text-lg mt-1 tracking-wider">LEGAJO DEL CATEQUIZANDO</h1>
      </div>

      <div className="text-center mb-3">
        <div className="font-bold italic text-[14px]">Parroquia Santuario San Roque</div>
        <div className="text-[11px] font-semibold">
          Pje. Lucio Quiroga 91, La Chacarita - (4700) San Fernando del Valle de Catamarca - Tel. (+54) (383) 4859396
        </div>
      </div>

      <TituloSeccion>Datos personales</TituloSeccion>
      <Fila>
        <Campo etiqueta="APELLIDO y Nombres:" valor={nombreCompleto} />
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{legajo.dni || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Lugar de nacimiento:" valor={legajo.lugarNacimiento} />
        <span className="whitespace-nowrap mx-2">Fecha de Nacimiento:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(legajo.fechaNacimiento)}</span>
        <span className="whitespace-nowrap mx-2">Edad:</span>
        <span className="w-12 border-b border-black text-center">{edad ?? ''}</span>
        <span className="whitespace-nowrap ml-1">años</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Padre (Nombres y Apellido):" valor={legajo.padre?.nombre} />
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{legajo.padre?.dni || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Madre (Nombres y Apellido):" valor={legajo.madre?.nombre} />
        <span className="whitespace-nowrap mx-2">D. N. I.:</span>
        <span className="w-28 border-b border-black text-center">{legajo.madre?.dni || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Domicilio:" valor={legajo.domicilio} />
      </Fila>

      <TituloSeccion>Datos del Bautismo</TituloSeccion>
      <Fila>
        <span className="whitespace-nowrap mr-2">Fecha de Bautismo:</span>
        <span className="w-10 border-b border-black text-center">{legajo.bautismo?.dia || ''}</span>
        <span className="whitespace-nowrap mx-2">Mes:</span>
        <span className="w-20 border-b border-black text-center">{legajo.bautismo?.mes || ''}</span>
        <span className="whitespace-nowrap mx-2">Año:</span>
        <span className="w-14 border-b border-black text-center">{legajo.bautismo?.anio || ''}</span>
        <span className="whitespace-nowrap mx-2">Parroquia:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.bautismo?.parroquia || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Diócesis:" valor={legajo.bautismo?.diocesis} />
        <span className="whitespace-nowrap mx-2">Libro:</span>
        <span className="w-14 border-b border-black text-center">{legajo.bautismo?.libro || ''}</span>
        <span className="whitespace-nowrap mx-2">Folio:</span>
        <span className="w-14 border-b border-black text-center">{legajo.bautismo?.folio || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Ministro celebrante:" valor={legajo.bautismo?.ministro} />
      </Fila>
      <Fila>
        <Campo etiqueta="Padrino:" valor={legajo.bautismo?.padrino} />
        <span className="whitespace-nowrap mx-2">Madrina:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.bautismo?.madrina || ''}</span>
      </Fila>

      <TituloSeccion>Primera Comunión</TituloSeccion>
      <Fila>
        <Campo etiqueta="Catequista:" valor={legajo.comunion1?.catequista} />
        <span className="whitespace-nowrap mx-2">Grupo:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.comunion1?.grupo || ''}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Lugar:" valor={legajo.comunion1?.lugar} />
        <span className="whitespace-nowrap mx-2">Fecha de Primera Confesión:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(legajo.comunion1?.fechaConfesion)}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Fecha de Primera Comunión:" valor={formatearFecha(legajo.comunion1?.fechaComunion)} centrado />
      </Fila>

      <TituloSeccion>Segunda Comunión</TituloSeccion>
      <Fila>
        <Campo etiqueta="Catequista:" valor={legajo.comunion2?.catequista} />
        <span className="whitespace-nowrap mx-2">Grupo:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.comunion2?.grupo || ''}</span>
        <span className="whitespace-nowrap mx-2">Lugar:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.comunion2?.lugar || ''}</span>
      </Fila>

      <TituloSeccion>Primera Confirmación</TituloSeccion>
      <Fila>
        <Campo etiqueta="Catequista:" valor={legajo.confirmacion1?.catequista} />
        <span className="whitespace-nowrap mx-2">Fecha de entrega del certificado:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(legajo.confirmacion1?.fechaEntregaCertificado)}</span>
      </Fila>

      <TituloSeccion>Segunda Confirmación</TituloSeccion>
      <Fila>
        <Campo etiqueta="Catequista:" valor={legajo.confirmacion2?.catequista} />
        <span className="whitespace-nowrap mx-2">Fecha de Confirmación:</span>
        <span className="flex-1 border-b border-black text-center">{formatearFecha(legajo.confirmacion2?.fechaConfirmacion)}</span>
      </Fila>
      <Fila>
        <Campo etiqueta="Grupo:" valor={legajo.confirmacion2?.grupo} />
        <span className="whitespace-nowrap mx-2">Lugar:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.confirmacion2?.lugar || ''}</span>
        <span className="whitespace-nowrap mx-2">Padrino o Madrina:</span>
        <span className="flex-1 border-b border-black px-2">{legajo.confirmacion2?.padrinoMadrina || ''}</span>
      </Fila>

      {legajo.pase?.aplica && (
        <>
          <TituloSeccion>Pase</TituloSeccion>
          <Fila>
            <Campo etiqueta="Diócesis:" valor={legajo.pase?.diocesis} />
            <span className="whitespace-nowrap mx-2">Fecha:</span>
            <span className="flex-1 border-b border-black text-center">{formatearFecha(legajo.pase?.fecha)}</span>
            <span className="whitespace-nowrap mx-2">Nivel cursado:</span>
            <span className="flex-1 border-b border-black px-2">{legajo.pase?.nivelCursado || ''}</span>
          </Fila>
        </>
      )}

      <TituloSeccion>Varios</TituloSeccion>
      <div className="border-b border-black min-h-10 px-2 mb-2">{legajo.varios || ''}</div>

    </div>
  );
}

function CampoForm({ etiqueta, name, valor, onChange, tipo = 'text', placeholder = '' }) {
  return (
    <div>
      <label className={clasesLabel}>{etiqueta}</label>
      <input
        type={tipo}
        name={name}
        value={valor ?? ''}
        onChange={onChange}
        placeholder={placeholder}
        className={clasesInput}
      />
    </div>
  );
}

function EncabezadoSeccion({ children }) {
  return (
    <div className="md:col-span-2 border-t pt-4 mt-2">
      <h3 className="font-bold text-gray-700 text-lg">{children}</h3>
    </div>
  );
}

export default function ComunionesPage() {
  const [vista, setVista] = useState('lista');
  const [busqueda, setBusqueda] = useState('');
  const [legajoActual, setLegajoActual] = useState(null);
  const [errores, setErrores] = useState([]);
  const inputArchivo = useRef(null);

  const legajos = useLiveQuery(() => buscarLegajos(busqueda), [busqueda]) ?? [];

  useEffect(() => {
    if (vista === 'impresion') {
      const timer = setTimeout(() => window.print(), 400);
      return () => clearTimeout(timer);
    }
  }, [vista]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nuevoValor = type === 'checkbox' ? checked : value;
    setLegajoActual((prev) => {
      const partes = name.split('.');
      if (partes.length === 1) return { ...prev, [name]: nuevoValor };
      return { ...prev, [partes[0]]: { ...(prev[partes[0]] || {}), [partes[1]]: nuevoValor } };
    });
  };

  const abrirNuevo = () => {
    setLegajoActual(LEGAJO_VACIO());
    setErrores([]);
    setVista('formulario');
  };

  const abrirEdicion = (legajo) => {
    setLegajoActual(copiarLegajo(legajo));
    setErrores([]);
    setVista('formulario');
  };

  const abrirImpresion = (legajo) => {
    setLegajoActual(copiarLegajo(legajo));
    setVista('impresion');
  };

  const confirmarEliminar = async (legajo) => {
    if (!window.confirm(`¿Eliminar el legajo de ${legajo.apellidos}, ${legajo.nombres}?`)) return;
    await eliminarLegajo(legajo.id);
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    const legajoConEdad = { ...legajoActual, edad: calcularEdad(legajoActual.fechaNacimiento) };
    const { valido, errores: erroresValidacion } = validarLegajo(legajoConEdad);
    if (!valido) {
      setErrores(erroresValidacion);
      return;
    }
    (async () => {
      if (legajoConEdad.id) {
        await actualizarLegajo(legajoConEdad.id, legajoConEdad);
      } else {
        await crearLegajo(legajoConEdad);
      }
      setLegajoActual(null);
      setErrores([]);
      setVista('lista');
    })();
  };

  const manejarImportar = async (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    try {
      const cantidad = await importarJSON(archivo);
      window.alert(`Se importaron ${cantidad} legajos correctamente.`);
    } catch {
      window.alert('No se pudo importar el archivo JSON.');
    }
    e.target.value = '';
  };

  if (vista === 'formulario' && legajoActual) {
    const edad = calcularEdad(legajoActual.fechaNacimiento);

    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl mb-8 print:hidden">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            {legajoActual.id ? 'Editar Legajo de Catequesis' : 'Nuevo Legajo de Catequesis'}
          </h2>

          {errores.length > 0 && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              <ul className="list-disc ml-5">
                {errores.map((error) => <li key={error} className="text-sm">{error}</li>)}
              </ul>
            </div>
          )}

          <form onSubmit={handleGuardar} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
            <EncabezadoSeccion>Datos personales</EncabezadoSeccion>

            <div>
              <label className={clasesLabel}>Tipo</label>
              <select name="tipo" value={legajoActual.tipo} onChange={handleChange} className={clasesInput}>
                <option value="niño">Niño</option>
                <option value="adulto">Adulto</option>
              </select>
            </div>
            <div></div>

            <CampoForm etiqueta="Apellidos" name="apellidos" valor={legajoActual.apellidos} onChange={handleChange} />
            <CampoForm etiqueta="Nombres" name="nombres" valor={legajoActual.nombres} onChange={handleChange} />
            <CampoForm etiqueta="D.N.I." name="dni" valor={legajoActual.dni} onChange={handleChange} />
            <CampoForm etiqueta="Fecha de Nacimiento" name="fechaNacimiento" valor={legajoActual.fechaNacimiento} onChange={handleChange} tipo="date" />
            <div>
              <label className={clasesLabel}>Edad (calculada)</label>
              <input type="text" value={edad ?? ''} disabled className={`${clasesInput} bg-gray-100`} />
            </div>
            <CampoForm etiqueta="Lugar de Nacimiento" name="lugarNacimiento" valor={legajoActual.lugarNacimiento} onChange={handleChange} />
            <div className="md:col-span-2">
              <CampoForm etiqueta="Domicilio" name="domicilio" valor={legajoActual.domicilio} onChange={handleChange} />
            </div>

            <EncabezadoSeccion>Padres</EncabezadoSeccion>
            <CampoForm etiqueta="Padre (Nombres y Apellido)" name="padre.nombre" valor={legajoActual.padre?.nombre} onChange={handleChange} />
            <CampoForm etiqueta="D.N.I. del Padre" name="padre.dni" valor={legajoActual.padre?.dni} onChange={handleChange} />
            <CampoForm etiqueta="Madre (Nombres y Apellido)" name="madre.nombre" valor={legajoActual.madre?.nombre} onChange={handleChange} />
            <CampoForm etiqueta="D.N.I. de la Madre" name="madre.dni" valor={legajoActual.madre?.dni} onChange={handleChange} />

            <EncabezadoSeccion>Bautismo</EncabezadoSeccion>
            <CampoForm etiqueta="Día" name="bautismo.dia" valor={legajoActual.bautismo?.dia} onChange={handleChange} />
            <CampoForm etiqueta="Mes" name="bautismo.mes" valor={legajoActual.bautismo?.mes} onChange={handleChange} />
            <CampoForm etiqueta="Año" name="bautismo.anio" valor={legajoActual.bautismo?.anio} onChange={handleChange} />
            <CampoForm etiqueta="Parroquia" name="bautismo.parroquia" valor={legajoActual.bautismo?.parroquia} onChange={handleChange} />
            <CampoForm etiqueta="Diócesis" name="bautismo.diocesis" valor={legajoActual.bautismo?.diocesis} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <CampoForm etiqueta="Libro" name="bautismo.libro" valor={legajoActual.bautismo?.libro} onChange={handleChange} />
              <CampoForm etiqueta="Folio" name="bautismo.folio" valor={legajoActual.bautismo?.folio} onChange={handleChange} />
            </div>
            <CampoForm etiqueta="Ministro celebrante" name="bautismo.ministro" valor={legajoActual.bautismo?.ministro} onChange={handleChange} />
            <div className="grid grid-cols-2 gap-4">
              <CampoForm etiqueta="Padrino" name="bautismo.padrino" valor={legajoActual.bautismo?.padrino} onChange={handleChange} />
              <CampoForm etiqueta="Madrina" name="bautismo.madrina" valor={legajoActual.bautismo?.madrina} onChange={handleChange} />
            </div>

            <EncabezadoSeccion>Primera Comunión</EncabezadoSeccion>
            <CampoForm etiqueta="Catequista" name="comunion1.catequista" valor={legajoActual.comunion1?.catequista} onChange={handleChange} />
            <CampoForm etiqueta="Grupo" name="comunion1.grupo" valor={legajoActual.comunion1?.grupo} onChange={handleChange} />
            <CampoForm etiqueta="Lugar" name="comunion1.lugar" valor={legajoActual.comunion1?.lugar} onChange={handleChange} />
            <CampoForm etiqueta="Fecha de Primera Confesión" name="comunion1.fechaConfesion" valor={legajoActual.comunion1?.fechaConfesion} onChange={handleChange} tipo="date" />
            <CampoForm etiqueta="Fecha de Primera Comunión" name="comunion1.fechaComunion" valor={legajoActual.comunion1?.fechaComunion} onChange={handleChange} tipo="date" />

            <EncabezadoSeccion>Segunda Comunión</EncabezadoSeccion>
            <CampoForm etiqueta="Catequista" name="comunion2.catequista" valor={legajoActual.comunion2?.catequista} onChange={handleChange} />
            <CampoForm etiqueta="Grupo" name="comunion2.grupo" valor={legajoActual.comunion2?.grupo} onChange={handleChange} />
            <CampoForm etiqueta="Lugar" name="comunion2.lugar" valor={legajoActual.comunion2?.lugar} onChange={handleChange} />

            <EncabezadoSeccion>Primera Confirmación</EncabezadoSeccion>
            <CampoForm etiqueta="Catequista" name="confirmacion1.catequista" valor={legajoActual.confirmacion1?.catequista} onChange={handleChange} />
            <CampoForm etiqueta="Fecha de entrega del certificado" name="confirmacion1.fechaEntregaCertificado" valor={legajoActual.confirmacion1?.fechaEntregaCertificado} onChange={handleChange} tipo="date" />

            <EncabezadoSeccion>Segunda Confirmación</EncabezadoSeccion>
            <CampoForm etiqueta="Catequista" name="confirmacion2.catequista" valor={legajoActual.confirmacion2?.catequista} onChange={handleChange} />
            <CampoForm etiqueta="Fecha de Confirmación" name="confirmacion2.fechaConfirmacion" valor={legajoActual.confirmacion2?.fechaConfirmacion} onChange={handleChange} tipo="date" />
            <CampoForm etiqueta="Grupo" name="confirmacion2.grupo" valor={legajoActual.confirmacion2?.grupo} onChange={handleChange} />
            <CampoForm etiqueta="Lugar" name="confirmacion2.lugar" valor={legajoActual.confirmacion2?.lugar} onChange={handleChange} />
            <CampoForm etiqueta="Padrino o Madrina" name="confirmacion2.padrinoMadrina" valor={legajoActual.confirmacion2?.padrinoMadrina} onChange={handleChange} />

            <EncabezadoSeccion>Pase</EncabezadoSeccion>
            <div>
              <label className="flex items-center gap-2 text-xs font-bold text-gray-700 uppercase">
                <input type="checkbox" name="pase.aplica" checked={!!legajoActual.pase?.aplica} onChange={handleChange} />
                Aplica pase
              </label>
            </div>
            <CampoForm etiqueta="Diócesis" name="pase.diocesis" valor={legajoActual.pase?.diocesis} onChange={handleChange} />
            <CampoForm etiqueta="Fecha" name="pase.fecha" valor={legajoActual.pase?.fecha} onChange={handleChange} tipo="date" />
            <CampoForm etiqueta="Nivel cursado" name="pase.nivelCursado" valor={legajoActual.pase?.nivelCursado} onChange={handleChange} />

            <EncabezadoSeccion>Varios</EncabezadoSeccion>
            <div className="md:col-span-2">
              <label className={clasesLabel}>Varios</label>
              <textarea name="varios" value={legajoActual.varios} onChange={handleChange} rows={3} className={clasesInput} />
            </div>

            <div className="md:col-span-2 flex justify-end gap-3 mt-6">
              <button type="button" onClick={() => setVista('lista')} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-bold">Cancelar</button>
              <button type="submit" className="bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 font-bold shadow-lg">Guardar Legajo</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (vista === 'impresion' && legajoActual) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
        <div className="max-w-4xl mx-auto print:hidden flex justify-end gap-3 mb-4">
          <button onClick={() => setVista('lista')} className="bg-gray-200 text-gray-700 px-6 py-2 rounded hover:bg-gray-300 font-bold">Volver</button>
          <button onClick={() => window.print()} className="bg-blue-700 text-white px-8 py-2 rounded hover:bg-blue-800 font-bold shadow-lg">🖨️ Imprimir</button>
        </div>
        <HojaA4>
          <div className="flex-1 min-h-0 w-full pt-8 pb-8 pl-20 pr-8 box-border overflow-hidden">
            <VistaLegajoImpresion legajo={legajoActual} />
          </div>
        </HojaA4>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8 print:p-0">
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-xl mb-8 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Legajos de Catequesis - Primera Comunión</h2>
          <div className="flex flex-wrap gap-2">
            <button onClick={abrirNuevo} className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 font-bold">＋ Nuevo Legajo</button>
            <button onClick={() => exportarJSON()} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 font-bold">📥 Exportar JSON</button>
            <button onClick={() => inputArchivo.current?.click()} className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 font-bold">📤 Importar JSON</button>
            <input ref={inputArchivo} type="file" accept=".json,application/json" onChange={manejarImportar} className="hidden" />
          </div>
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por apellidos, nombres o D.N.I..."
            className={clasesInput}
          />
        </div>

        {legajos.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">📄</div>
            <p className="font-bold">No hay legajos {busqueda ? 'que coincidan con la búsqueda' : 'cargados'}</p>
            <p className="text-sm mt-2">Creá un nuevo legajo o importá un respaldo JSON.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">Apellidos</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">Nombres</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">D.N.I.</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">Edad</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">Tipo</th>
                  <th className="px-3 py-2 text-left font-bold text-gray-700 uppercase text-xs">Actualizado</th>
                  <th className="px-3 py-2 text-right font-bold text-gray-700 uppercase text-xs">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {legajos.map((legajo) => (
                  <tr key={legajo.id} className="hover:bg-gray-50">
                    <td className="px-3 py-2">{legajo.apellidos}</td>
                    <td className="px-3 py-2">{legajo.nombres}</td>
                    <td className="px-3 py-2">{legajo.dni}</td>
                    <td className="px-3 py-2">{calcularEdad(legajo.fechaNacimiento) ?? '—'}</td>
                    <td className="px-3 py-2">{legajo.tipo === 'adulto' ? 'Adulto' : 'Niño'}</td>
                    <td className="px-3 py-2">{formatearTimestamp(legajo.actualizadoEn)}</td>
                    <td className="px-3 py-2 text-right whitespace-nowrap">
                      <button onClick={() => abrirImpresion(legajo)} className="text-blue-600 hover:underline mr-3 font-semibold">Ver/Imprimir</button>
                      <button onClick={() => abrirEdicion(legajo)} className="text-gray-600 hover:underline mr-3 font-semibold">Editar</button>
                      <button onClick={() => confirmarEliminar(legajo)} className="text-red-600 hover:underline font-semibold">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
