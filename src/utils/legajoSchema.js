export function generarId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function LEGAJO_VACIO() {
  return {
    id: '',
    tipo: 'niño',
    apellidos: '',
    nombres: '',
    dni: '',
    fechaNacimiento: '',
    edad: null,
    lugarNacimiento: '',
    domicilio: '',
    padre: { nombre: '', dni: '' },
    madre: { nombre: '', dni: '' },
    bautismo: {
      dia: '', mes: '', anio: '', parroquia: '', diocesis: '',
      libro: '', folio: '', ministro: '', padrino: '', madrina: ''
    },
    comunion1: {
      catequista: '', grupo: '', lugar: '', fechaConfesion: '', fechaComunion: ''
    },
    comunion2: { catequista: '', grupo: '', lugar: '' },
    confirmacion1: { catequista: '', fechaEntregaCertificado: '' },
    confirmacion2: {
      catequista: '', fechaConfirmacion: '', grupo: '', lugar: '', padrinoMadrina: ''
    },
    pase: { aplica: false, diocesis: '', fecha: '', nivelCursado: '' },
    varios: '',
    creadoEn: '',
    actualizadoEn: ''
  };
}

export function calcularEdad(fechaNacimiento) {
  if (!fechaNacimiento) return null;
  const partes = String(fechaNacimiento).split('-').map(Number);
  if (partes.length !== 3 || !partes[0] || !partes[1] || !partes[2]) return null;
  const [anio, mes, dia] = partes;
  const hoy = new Date();
  let edad = hoy.getFullYear() - anio;
  const mesActual = hoy.getMonth() + 1;
  if (mesActual < mes || (mesActual === mes && hoy.getDate() < dia)) {
    edad -= 1;
  }
  return edad;
}

export function validarLegajo(legajo) {
  const errores = [];
  if (!String(legajo.apellidos ?? '').trim()) errores.push('El campo Apellidos es obligatorio.');
  if (!String(legajo.nombres ?? '').trim()) errores.push('El campo Nombres es obligatorio.');
  if (!String(legajo.dni ?? '').trim()) errores.push('El campo D.N.I. es obligatorio.');
  return { valido: errores.length === 0, errores };
}
