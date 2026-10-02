import Dexie from 'dexie';
import { generarId } from '../utils/legajoSchema';

const db = new Dexie('legajosDB');
db.version(1).stores({
  legajos: 'id, dni, apellidos, nombres, tipo, actualizadoEn'
});

export async function crearLegajo(datos) {
  const ahora = new Date().toISOString();
  const legajo = {
    ...datos,
    id: datos.id || generarId(),
    creadoEn: datos.creadoEn || ahora,
    actualizadoEn: ahora
  };
  await db.legajos.add(legajo);
  return legajo;
}

export function obtenerLegajo(id) {
  return db.legajos.get(id);
}

export async function actualizarLegajo(id, cambios) {
  await db.legajos.update(id, { ...cambios, actualizadoEn: new Date().toISOString() });
  return obtenerLegajo(id);
}

export function eliminarLegajo(id) {
  return db.legajos.delete(id);
}

export function listarLegajos() {
  return db.legajos.orderBy('actualizadoEn').reverse().toArray();
}

export async function buscarLegajos(texto) {
  const termino = String(texto ?? '').trim().toLowerCase();
  if (!termino) return listarLegajos();
  const todos = await db.legajos.toArray();
  return todos.filter((legajo) =>
    [legajo.apellidos, legajo.nombres, legajo.dni].some((valor) =>
      String(valor ?? '').toLowerCase().includes(termino)
    )
  );
}

export async function exportarJSON() {
  const legajos = await db.legajos.toArray();
  const blob = new Blob([JSON.stringify(legajos, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const enlace = document.createElement('a');
  enlace.href = url;
  enlace.download = `legajos-comuniones-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(enlace);
  enlace.click();
  enlace.remove();
  URL.revokeObjectURL(url);
}

export async function importarJSON(archivo) {
  const texto = await archivo.text();
  const datos = JSON.parse(texto);
  const legajos = Array.isArray(datos) ? datos : [datos];
  let importados = 0;
  for (const legajo of legajos) {
    await db.legajos.put({ ...legajo, id: legajo.id || generarId() });
    importados += 1;
  }
  return importados;
}
