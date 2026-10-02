# INFORME TÉCNICO COMPLETO — Sistema de Sacramentos (PSR)

Fecha: 23/09/2026 · Análisis de solo lectura · Repo: Parroquia Santuario San Roque

## 1. Resumen ejecutivo

SPA local (sin backend) para la Parroquia Santuario San Roque que gestiona tres sacramentos: **Bautismos** (formulario → 2 certificados A5 por hoja), **Comuniones** (legajo de catequesis persistente en IndexedDB con etapas, recién implementado y sin commitear) y **Confirmaciones** (carga masiva Excel → 3 documentos por registro). Toda la salida se imprime con `window.print()` en hojas A4 replicando formularios oficiales de la Diócesis de Catamarca. Último commit (`c6dbc1e`) incluyó una limpieza: se eliminaron dependencias sin uso, assets huérfanos e imports innecesarios. Queda trabajo de unificación de plantillas duplicadas y documentación desactualizada.

## 2. Stack tecnológico

| Dependencia | Versión | Uso real en el código |
|---|---|---|
| react / react-dom | ^19.2.7 | UI de todas las páginas (main.jsx) |
| react-router-dom | ^7.18.1 | Rutas (App.jsx), Link/useLocation (Header, HomePage) |
| vite | ^8.1.1 | Dev server y build (scripts) |
| @vitejs/plugin-react | ^6.0.3 | Plugin React en vite.config.js |
| tailwindcss | ^4.3.2 | `@import "tailwindcss"` en index.css; generación de utilidades |
| @tailwindcss/vite | ^4.3.2 | Plugin Tailwind en vite.config.js |
| xlsx (SheetJS) | ^0.18.5 | Lectura Excel (ExcelGenerator.jsx) y generación XLSX (confirmacionesExcel.js) |
| dexie | ^4.4.6 | IndexedDB wrapper en src/db/legajosDB.js (NUEVO) |
| dexie-react-hooks | ^4.4.0 | useLiveQuery en ComunionesPage.jsx (NUEVO) |
| oxlint | ^1.71.0 | Linter (`npm run lint`) |

Nota: `@types/react` y `@types/react-dom` fueron eliminadas en el commit de limpieza (proyecto 100% JS). Ya **no hay** dependencias sin uso.

## 3. Estructura completa de carpetas y archivos

```
PSR/
├── index.html                     # HTML de entrada (title: "mis-confirmaciones" — desactualizado)
├── package.json                   # Deps y scripts (dev/build/lint/preview)
├── vite.config.js                 # Plugins react + tailwindcss
├── .oxlintrc.json                 # Reglas react/rules-of-hooks + only-export-components
├── README.md                      # ⚠ Plantilla genérica de Vite (no describe el proyecto)
├── INFORME.md                     # Informe técnico anterior
├── ?? Manual Técnico.docx         # Manual en Word (nombre corrupto por codificación)
├── public/
│   └── favicon.svg                # Ícono usado en index.html
├── dist/                          # Build generado (favicon, index.html, 1 css, 1 js)
└── src/
    ├── main.jsx                   # Bootstrap React + StrictMode
    ├── App.jsx                    # Router + Header/Footer (4 rutas)
    ├── index.css                  # Tailwind + reglas de impresión A4 + CSS muerto
    ├── PlantillaComunicado.jsx    # ⚠ Plantilla Confirmación (mal ubicada en raíz de src)
    ├── README.md                  # ⚠ Manual técnico viejo (era del módulo único de confirmaciones)
    ├── pages/
    │   └── HomePage.jsx           # Landing con 3 tarjetas de sacramentos
    ├── db/
    │   └── legajosDB.js           # NUEVO: Dexie + CRUD + export/import JSON (sin commitear)
    ├── utils/
    │   └── legajoSchema.js        # NUEVO: LEGAJO_VACIO, calcularEdad, validarLegajo, generarId (sin commitear)
    └── components/
        ├── common/
        │   ├── Header.jsx         # Barra de navegación (print:hidden)
        │   ├── Footer.jsx         # Pie genérico
        │   └── PrintLayout.jsx    # HojaA4 (210×297mm) y MitadHoja (148.5mm)
        ├── bautismos/
        │   └── BautismosPage.jsx  # Formulario + certificado + helpers de formato
        ├── comuniones/
        │   └── ComunionesPage.jsx # NUEVO: legajo persistente (lista/form/impresión)
        └── confirmaciones/
            ├── ConfirmacionesPage.jsx  # Carga Excel → 3 copias → impresión
            ├── ExcelGenerator.jsx      # Input de Excel + descarga de plantilla
            └── confirmacionesExcel.js  # Plantilla de columnas + export XLSX
```

`src/assets/` y `public/icons.svg` ya no existen (eliminados en la limpieza).

## 4. Análisis archivo por archivo

| Archivo | Líneas | Qué hace | Exporta | Depende de | Lo importan | Ubicación |
|---|---|---|---|---|---|---|
| main.jsx | 10 | Monta App en #root con StrictMode | — (side effect) | App.jsx, index.css | index.html | ✅ |
| App.jsx | 28 | Router con 4 rutas + layout Header/main/Footer | `App` (default) | react-router-dom, 6 componentes | main.jsx | ✅ |
| index.css | 35 | Tailwind + @page A4 + print-color-adjust | CSS | tailwindcss | main.jsx | ✅ (con CSS muerto) |
| pages/HomePage.jsx | 106 | Tarjetas de navegación por sacramento | `HomePage` (default) | react-router-dom | App.jsx | ✅ |
| common/Header.jsx | 64 | Nav con iconos y estado activo | `Header` (default) | react-router-dom | App.jsx | ✅ |
| common/Footer.jsx | 15 | Pie con versión y créditos | `Footer` (default) | — | App.jsx | ✅ |
| common/PrintLayout.jsx | 15 | `HojaA4` (210×297mm) y `MitadHoja` (148.5mm, línea de corte opcional) | `HojaA4`, `MitadHoja` | — | BautismosPage, ConfirmacionesPage, ComunionesPage | ✅ |
| bautismos/BautismosPage.jsx | 362 | Formulario + certificado + helpers de formato de nombres y Certificado N° | `BautismosPage` (default); `CertificadoBautismo` y helpers internos | PrintLayout | App.jsx | ✅ (mezcla 3 responsabilidades) |
| comuniones/ComunionesPage.jsx | 451 | Legajo persistente: lista con búsqueda, formulario por etapas, impresión | `ComunionesPage` (default); helpers internos | dexie-react-hooks, PrintLayout, legajosDB, legajoSchema | App.jsx | ✅ (NUEVO, sin commitear) |
| confirmaciones/ConfirmacionesPage.jsx | 97 | Carga Excel → 3 copias (fiel/parroquia/comunicado) → paginación A4 | `ConfirmacionesPage` (default) | PlantillaComunicado, ExcelGenerator, PrintLayout | App.jsx | ✅ |
| confirmaciones/ExcelGenerator.jsx | 118 | Input de archivo Excel + descarga de plantilla | `ExcelGenerator` (default) | xlsx, confirmacionesExcel | ConfirmacionesPage | ✅ |
| confirmaciones/confirmacionesExcel.js | 44 | Plantilla de columnas + export XLSX | `PLANTILLA_CONFIRMACIONES`, `exportarExcelConfirmaciones` | xlsx | ExcelGenerator | ✅ |
| db/legajosDB.js | 63 | Base Dexie `legajosDB` v1 + CRUD + export/import JSON | 8 funciones | dexie, legajoSchema | ComunionesPage | ✅ (NUEVO) |
| utils/legajoSchema.js | 61 | Estructura del legajo + edad + validación + UUID | `LEGAJO_VACIO`, `calcularEdad`, `validarLegajo`, `generarId` | — | legajosDB, ComunionesPage | ✅ (NUEVO) |
| PlantillaComunicado.jsx | 142 | Plantilla Certificado/Comunicación de Confirmación | `PlantillaComunicado` (default) | — | ConfirmacionesPage | ❌ Debería estar en components/confirmaciones/ |
| README.md (src/) | 70 | Manual técnico del proyecto original (1 módulo) | — | — | nadie (docs) | ⚠ Desactualizado |
| README.md (raíz) | 16 | Plantilla genérica de Vite | — | — | nadie (docs) | ⚠ No describe el proyecto |

## 5. Funcionalidades por módulo

**Bautismos** (`/bautismos`)
- Formulario manual: personales (apellido/nombres, DNI, lugar y fecha de nacimiento, padre/madre con DNI, selector Hijo/a Legítimo/Legítima/-, domicilio, teléfono) y del bautismo (lugar, fecha, ministro, padrino, madrina, libro, folio, orden).
- Validación de entrada: libro/folio/orden solo dígitos; DNIs solo dígitos y puntos (BautismosPage.jsx:179-189).
- Formato automático al renderizar: apellido en MAYÚSCULAS y nombres en Título con preposiciones en minúscula (`de, del, los, la, las`), padre/madre inverso (nombres Título, apellido MAYÚSCULAS).
- Certificado N° autogenerado `AñoMesDía-Orden/Libro-` (línea 10-15) bajo la fila Libro/Folio.
- Imprime 2 certificados por hoja (Parroquia/Fiel); leyenda a la izquierda, firma punteada a la derecha. Sin SELLO ni "Certificamos que:" (diseño 2026).

**Comuniones** (`/comuniones`) — reescrito
- Legajo persistente en IndexedDB (Dexie). Lista reactiva con búsqueda por apellidos/nombres/DNI, columnas edad (calculada), tipo, última actualización; acciones Ver/Imprimir, Editar, Eliminar (confirm), Nuevo.
- Formulario por etapas: personales, padres, bautismo, 1° y 2° Comunión, 1° y 2° Confirmación, Pase (opcional) y Varios. Edad calculada no editable. Validación mínima (apellidos, nombres, DNI obligatorios).
- Impresión en A4 completa replicando el legajo físico (secciones por etapa, pase solo si aplica, firmas Catequista/Párroco).
- Respaldo: exportar todos los legajos a JSON e importar desde JSON (sobrescribe por id).

**Confirmaciones** (`/confirmaciones`)
- Descarga de plantilla Excel con las columnas exactas; carga masiva; contador de registros; genera 3 copias por registro (Fiel, Parroquia, Comunicación) paginadas 2 por hoja A4 con línea de corte.

**Home / Navegación**
- Landing con 3 tarjetas y Header con nav. Header/Footer ocultos al imprimir (print:hidden).

## 6. Flujo de datos

- **App.jsx**: único estado global = ninguno. Cada página es independiente.
- **BautismosPage**: `formData` (useState plano, 18 campos) → al enviar, `showForm=false` y renderiza `HojaA4 > MitadHoja×2 > CertificadoBautismo` pasando `data={formData}` y `tipo` ('parroquia'/'fiel'). `CertificadoBautismo` recibe props `data` y `tipo` (solo lo usa para la leyenda).
- **ComunionesPage**: `vista` ('lista'|'formulario'|'impresion'), `busqueda`, `legajoActual` (objeto anidado editable), `errores`. La lista viene de `useLiveQuery(() => buscarLegajos(busqueda), [busqueda])` — reactivo a IndexedDB. El formulario escribe con `crearLegajo`/`actualizarLegajo`; `legajoActual` se copia profundo (JSON) antes de editar. Impresión: `VistaLegajoImpresion legajo={legajoActual}` + `window.print()` tras 400 ms.
- **ConfirmacionesPage**: `datosExcel` (array de filas del Excel). `ExcelGenerator` llama `onDataLoaded(filas)` (prop callback). Se expande a `copias` (3 por registro) y `paginas` (de a 2) calculados en cada render (sin useMemo). `PlantillaComunicado` recibe `data` (fila) y `tipo`.
- **Legajos (db)**: `legajosDB.js` es un singleton Dexie (tabla `legajos`, índices id/dni/apellidos/nombres/tipo/actualizadoEn). `crearLegajo`/`actualizarLegajo` setean `creadoEn`/`actualizadoEn` automáticamente.
- **Impresión**: `index.css` define `@page A4 margin 0` y `print-color-adjust: exact`; controles con `print:hidden`; hojas con `w-[210mm] h-[297mm]`.

## 7. ⚠️ Problemas detectados

### Código duplicado
- `formatearFecha` (idéntica) en BautismosPage.jsx:4-8 y ComunionesPage.jsx (helper local).
- Encabezado parroquial (Diócesis/Provincia/dirección) repetido 3 veces: BautismosPage.jsx:60-72, PlantillaComunicado.jsx:10-36, ComunionesPage.jsx (VistaLegajoImpresion).
- Pie de firma (línea + "Párroco") repetido en los 3 módulos.
- Fila "etiqueta + campo subrayado": patrón JSX repetido ~35 veces entre BautismosPage y PlantillaComunicado (ComunionesPage ya lo extrajo en `Campo`/`Fila`).
- `estadoInicial` de BautismosPage duplicado literalmente: useState (167-174) y limpiarFormulario (204-211).
- String de clases de input repetido en cada campo de BautismosPage (ComunionesPage usa constantes `clasesInput`/`clasesLabel`).

### Componentes a extraer/unificar
- `EncabezadoCertificado`, `PieFirmas` y `CampoFila` en common/ para las 3 plantillas.
- Helpers de formato (fechas, nombres, Certificado N°) en un único `utils/` compartido (hoy viven en BautismosPage y ComunionesPage).
- Diseño inconsistente entre módulos: Bautismos ya no tiene SELLO, "Certificamos que:", ni nombre de párroco; PlantillaComunicado (Confirmaciones) conserva todo eso (SELLO en parroquia, "Comunicamos que:" en los tres tipos).

### Dependencias sin uso
- Ninguna (las que sobraban se eliminaron en `c6dbc1e`).

### Imports sin usar
- Ninguno detectado (verificado en los 16 archivos de src).

### Código muerto
- index.css:16-18 `.no-print` — nadie la usa (se usa `print:hidden` de Tailwind).
- index.css:22-24 `.border-dashed` — Tailwind ya provee `border-dashed`.
- index.css:27-35 `@keyframes spin` + `.animate-spin` — duplican la utilidad `animate-spin` de Tailwind.
- BautismosPage.jsx:348 y 353: comentarios "CON sello" / "SIN sello" desactualizados (el sello ya no existe).
- `legajo.edad` se guarda en IndexedDB pero nunca se lee (la lista y la impresión recalculan con `calcularEdad`).

### Archivos huérfanos / desactualizados
- `src/PlantillaComunicado.jsx` mal ubicado (raíz de src; debería ir en components/confirmaciones/).
- `src/README.md`: documenta la arquitectura vieja de un solo módulo (dice que App.jsx "carga el Excel y pagina", cosa que hoy hace ConfirmacionesPage).
- `README.md` raíz: plantilla genérica de Vite.
- `?? Manual Técnico.docx`: nombre corrupto por codificación (debería ser "Manual Técnico.docx").

### Bugs / comportamientos sospechosos
- PlantillaComunicado.jsx:38: dice "Comunicamos que:" también en el tipo `CERTIFICADO DE CONFIRMACIÓN` (fiel/parroquia), donde correspondería "Certificamos que:". El título cambia pero el cuerpo no.
- ConfirmacionesPage.jsx:10-21: `copias` y `paginas` se recalculan en cada render mutando arrays (sin useMemo); funciona pero es frágil.
- Confirmaciones: no valida que el Excel tenga las columnas esperadas; con columnas faltantes imprime documentos vacíos sin aviso.
- Bautismos: permite imprimir un certificado completamente vacío (sin validación de campos).
- legajosDB.importarJSON no valida la estructura de los objetos importados (acepta cualquier JSON con forma arbitraria).
- `calcularEdad` no acota fechas futuras (puede devolver negativos).
- `validarLegajo` solo exige 3 campos; no valida formato de DNI ni coherencia de fechas.
- ComunionesPage: al guardar no hay feedback visual (solo vuelve a la lista); perder datos del formulario al cancelar sin confirmar.
- Dexie schema v1: cualquier cambio futuro de estructura requiere migración (version bump) que aún no está prevista.
- HomePage.jsx:18: descripción de Comuniones desactualizada ("Registro y certificados de Primera Comunión"; hoy es un legajo de catequesis persistente).
- index.html:7: `<title>mis-confirmaciones</title>` y package.json `name` no reflejan el sistema completo.

### Falta de validaciones / manejo de errores
- Bautismos: sin validación de obligatoriedad; las fechas dependen del input date.
- Confirmaciones: sin chequeo de encabezados; errores de archivo solo con alert/msg básico.
- Comuniones: validación mínima; import JSON con try/catch en el caller (correcto) pero sin sanitización; sin confirmación de "cancelar sin guardar"; sin manejo de errores de IndexedDB (quota, privado).

## 8. Módulo de Comuniones — análisis especial

**Premisa de la tarea**: "el código actual NO refleja un legajo persistente por etapas". **Estado real verificado**: esa premisa quedó desactualizada — el módulo fue reescrito y hoy SÍ es un legajo persistente por etapas (trabajo sin commitear).

**Qué tiene implementado hoy (ComunionesPage.jsx + db/legajosDB.js + utils/legajoSchema.js):**
- Persistencia en IndexedDB (Dexie) — sobrevive al cierre del navegador.
- CRUD completo, listado reactivo (useLiveQuery), búsqueda por apellidos/nombres/DNI.
- Formulario con todas las etapas del esquema: personales, padres, bautismo, 1° y 2° Comunión, 1° y 2° Confirmación, Pase (checkbox + datos), Varios.
- Edad calculada automáticamente (no editable), guardada en `legajo.edad`.
- Export/import JSON de respaldo.
- Vista de impresión A4 que replica el legajo (todas las secciones, pase condicional, firmas).
- Metadatos `creadoEn`/`actualizadoEn` automáticos.

**Qué le falta:**
- Commit del trabajo (ComunionesPage.jsx, src/db/, src/utils/, package.json/lock están modificados/sin trackear).
- Validaciones más ricas (formato DNI, fechas coherentes, obligatoriedad por etapa).
- Feedback al guardar (toast) y confirmación al cancelar con cambios.
- Migraciones Dexie (v1 sin plan de evolución).
- Actualizar textos del módulo en HomePage y documentación.

**Campos del legajo físico (comparación):**
- Presentes en el esquema e impresos: apellidos, nombres, DNI, fecha nacimiento, edad, lugar nacimiento, domicilio, padre/madre con DNI, bautismo (día/mes/año, parroquia, diócesis, libro, folio, ministro, padrino, madrina), 1° Comunión (catequista, grupo, lugar, fechas de confesión y comunión), 2° Comunión (catequista, grupo, lugar), 1° Confirmación (catequista, fecha entrega), 2° Confirmación (catequista, fecha, grupo, lugar, padrino/madrina), Pase (diócesis, fecha, nivel), Varios, firmas.
- Ausentes respecto del legajo anterior del sistema: **Teléfono**, **Día de clases** y **Horario** (sección "Registro de Catequesis" del módulo viejo). Si la foto del legajo físico los incluye, hay que agregarlos al esquema.
- La foto adjunta no llegó en la tarea: la comparación se hizo contra el esquema acordado y el legajo impreso anterior.

## 9. Recomendaciones priorizadas

| Tarea | Impacto | Esfuerzo |
|---|---|---|
| Commitear el módulo de Comuniones (legajo persistente) y deps Dexie | Alto | Bajo |
| Extraer componentes compartidos (Encabezado, PieFirmas, CampoFila) y usarlos en las 3 plantillas | Alto | Medio |
| Crear `utils/` compartido de formato (fechas, nombres, Certificado N°) y eliminar duplicados | Medio | Medio |
| Eliminar CSS muerto de index.css (.no-print, .border-dashed, spin custom) | Bajo | Bajo |
| Mover PlantillaComunicado.jsx a components/confirmaciones/ | Bajo | Bajo |
| Unificar diseño de certificados entre módulos (sello, "Certificamos/Comunicamos que:", firma) | Alto | Medio |
| Validar columnas del Excel en Confirmaciones + mensajes de error claros | Alto | Bajo |
| Validar campos obligatorios en Bautismos antes de imprimir | Medio | Bajo |
| Sanitizar/validar estructura en importarJSON + manejo de errores IndexedDB | Medio | Bajo |
| Enriquecer validarLegajo (DNI, fechas) y feedback al guardar en Comuniones | Medio | Bajo |
| Agregar Teléfono/Día de clases/Horario al legajo si el papel los exige | Medio | Bajo |
| Actualizar READMEs, `<title>`, package.json name y descripción de HomePage | Bajo | Bajo |
| Migraciones Dexie (plan de versionado) | Medio | Medio |
| useMemo en ConfirmacionesPage para copias/paginas | Bajo | Bajo |

## 10. Estado general

**MEJORABLE (tendiendo a saludable).** Lo estructural ya está bien: no hay dependencias ni imports sin uso, no hay assets huérfanos, el módulo de Comuniones se modernizó con persistencia real por etapas, y lint/build pasan sin errores. Los problemas restantes son de calidad interna: plantillas y helpers duplicados entre los 3 módulos (cada cambio de diseño hay que replicarlo a mano, como ya pasó entre Bautismos y Confirmaciones), CSS muerto, documentación desactualizada, validaciones débiles y el módulo nuevo sin commitear (riesgo de pérdida). Con la extracción de componentes compartidos y el commit pendiente, el proyecto quedaría saludable.
