# INFORME TÉCNICO — PSR (Sistema de Sacramentos)

Fecha: 23/09/2026 · Proyecto: `C:\Users\pa-ga\OneDrive\Desktop\PSR`

## 1. Resumen ejecutivo

Aplicación web local (SPA) para la Parroquia Santuario San Roque que genera e imprime documentación sacramental en formato A4 (dos documentos por hoja). Tres módulos: **Bautismos** (certificados Fiel/Parroquia por formulario manual), **Comuniones** (legajo + certificado + export a Excel) y **Confirmaciones** (carga masiva de Excel y genera 3 copias por registro: Fiel, Parroquia y Comunicación). No tiene backend ni persistencia: todo se procesa en el navegador y se imprime con `window.print()`. Estado: funcional pero con código duplicado entre módulos y restos de plantillas/archivos sin usar.

## 2. Stack tecnológico

| Dependencia | Uso |
|---|---|
| `react` / `react-dom` (19) | UI declarativa, SPA |
| `react-router-dom` (7) | Ruteo entre páginas (Header/App) |
| `vite` (8) | Dev server y build |
| `@vitejs/plugin-react` | Integración React (JSX automático) |
| `tailwindcss` (4) + `@tailwindcss/vite` | Estilos utilitarios (incluye modo print) |
| `xlsx` (SheetJS) | Lectura y generación de archivos .xlsx |
| `oxlint` | Linter (reglas react/rules-of-hooks) |
| `@types/react`, `@types/react-dom` | **SIN USO** — el proyecto es 100% JavaScript |

## 3. Estructura de carpetas

```
PSR/
├── index.html              # Entrada HTML (título desactualizado: "mis-confirmaciones")
├── vite.config.js          # Plugins react + tailwindcss
├── package.json / .oxlintrc.json / README.md (genérico de Vite)
├── public/                 # favicon.svg (usado), icons.svg (huérfano)
├── src/
│   ├── main.jsx            # Bootstrap React
│   ├── App.jsx             # Router + Header/Footer
│   ├── index.css           # Tailwind + ajustes de impresión (con CSS muerto)
│   ├── PlantillaComunicado.jsx  # ⚠ Mal ubicado (debería ir en components/confirmaciones)
│   ├── assets/             # hero.png, react.svg, vite.svg — todos huérfanos
│   ├── pages/HomePage.jsx  # Landing con tarjetas de sacramentos
│   └── components/
│       ├── common/         # Header, Footer, PrintLayout (HojaA4/MitadHoja)
│       ├── bautismos/BautismosPage.jsx      # Formulario + 2 certificados
│       ├── comuniones/ComunionesPage.jsx    # Legajo + certificado + Excel
│       └── confirmaciones/ # ConfirmacionesPage, ExcelGenerator, confirmacionesExcel.js
└── dist/                   # Build (generado)
```

## 4. Funcionalidades principales

1. **Bautismos**: formulario manual → 2 certificados A5 por hoja (Parroquia/Fiel), formateo de nombres, validación numérica de DNI/Libro/Folio, Certificado N° autogenerado (`AñoMesDía-Orden/Libro-`).
2. **Comuniones**: legajo completo (datos personales + bautismo + comunión + catequesis), impresión de certificado o legajo, export a Excel compatible con Confirmaciones.
3. **Confirmaciones**: descarga de plantilla Excel, carga masiva, 3 documentos por registro (Fiel/Parroquia/Comunicación), impresión 2 por hoja A4.

## 5. Análisis archivo por archivo

| Archivo | Qué hace | Ubicación |
|---|---|---|
| `main.jsx` | Monta React en #root | ✅ |
| `App.jsx` | Router con 4 rutas | ✅ |
| `index.css` | Tailwind + @page A4 + print-color-adjust | ✅ (con CSS muerto, ver §6) |
| `pages/HomePage.jsx` | Tarjetas de navegación | ✅ (comentario basura) |
| `common/Header.jsx` | Nav con iconos | ✅ |
| `common/Footer.jsx` | Pie genérico | ✅ |
| `common/PrintLayout.jsx` | HojaA4 + MitadHoja (línea de corte) | ✅ (sin commitear) |
| `bautismos/BautismosPage.jsx` | Formulario + plantilla certificado + helpers de formato | ✅ (364 líneas, mezcla lógica+UI) |
| `comuniones/ComunionesPage.jsx` | 2 plantillas + formulario + export Excel | ✅ pero gigante (596 líneas, 3 responsabilidades) |
| `confirmaciones/ConfirmacionesPage.jsx` | Carga Excel → 3 copias → impresión | ✅ |
| `confirmaciones/ExcelGenerator.jsx` | Input de archivo + descarga plantilla | ✅ |
| `confirmaciones/confirmacionesExcel.js` | Plantilla de columnas + export XLSX | ✅ |
| `PlantillaComunicado.jsx` | Plantilla de Confirmación/Comunicación | ❌ En `src/` raíz, no en `confirmaciones/` |
| `assets/react.svg`, `vite.svg`, `hero.png` | Restos de la plantilla de Vite | ❌ Huérfanos |
| `public/icons.svg` | Sin referencias | ❌ Huérfano |
| `public/favicon.svg` | Referenciado en index.html | ✅ |

## 6. ⚠️ COSAS DE MÁS

### Lógica duplicada
- `formatearFecha` idéntica en `BautismosPage` y `ComunionesPage`.
- `generarNroCertificado` existe en ambas páginas **con lógica distinta** (Bautismos: `AñoMesDía-Orden/Libro-`; Comuniones: `año-mes-día-libro-dni`) — misma intención, dos formatos.
- **Encabezado parroquial** (Diócesis/Provincia/Párroco/domicilio) repetido 4 veces: Bautismos, Comuniones (certificado + legajo), PlantillaComunicado.
- **Pie de firma** (sello + línea + "Párroco") repetido 4 veces, con variantes entre módulos.
- **Filas "etiqueta + campo subrayado"**: mismo patrón JSX repetido ~40 veces entre plantillas.
- `estadoInicial` duplicado literalmente en `BautismosPage` (useState + limpiarFormulario). Comuniones lo resolvió con una constante.
- Clases de input: `ComunionesPage` extrajo `clasesInput`/`clasesLabel`; `BautismosPage` repite el string completo en cada campo.

### Componentes que deberían unificarse
- `CertificadoBautismo`, `CertificadoComunion`, `LegajoComunion` y `PlantillaComunicado` → extraer `CampoFila`, `EncabezadoCertificado`, `PieFirmas` y `utils/formato.js`.
- Los tres módulos deberían compartir la misma versión del diseño (Bautismos ya difiere: sin "Certificamos que:", sin SELLO, sin Pbro., líneas punteadas).

### Dependencias instaladas sin uso
- `@types/react` y `@types/react-dom` (devDependencies): proyecto JavaScript puro.

### Código muerto
- `index.css`: `.no-print` (nadie la usa; se usa `print:hidden`), `.border-dashed` y `@keyframes spin`/`.animate-spin` (Tailwind ya los provee).
- `import React from 'react'` sin uso en 8 archivos (JSX automático): BautismosPage, ComunionesPage, ConfirmacionesPage, ExcelGenerator, Header, Footer, HomePage, PlantillaComunicado, PrintLayout.
- Comentario `// <--- Cambiado a Activo` en HomePage.
- En `ComunionesPage.descargarExcelConfirmacion` el campo 'Padrino o Madrina' solo mapea `formData.padrino` (pierde `madrina`).

### Imports sin usar
- Todos los `import React` listados arriba (oxlint no los detecta por configuración).

### Archivos huérfanos
- `src/assets/react.svg`, `src/assets/vite.svg`, `src/assets/hero.png`, `public/icons.svg`: nadie los importa/referencia.
- `src/README.md`: documentación (correcto que no se importe, pero conviene actualizar).
- `?? Manual Técnico.docx`: nombre corrupto por codificación ("Manual Técnico.docx").
- `PrintLayout.jsx` está **sin commitear** (aparece como `??` en git), igual que `confirmacionesExcel.js`.

## 7. Recomendaciones concretas

**Eliminar:**
- `src/assets/react.svg`, `vite.svg`, `hero.png`, `public/icons.svg`.
- `@types/react`, `@types/react-dom` de devDependencies.
- De `index.css`: `.no-print`, `.border-dashed`, `@keyframes spin`, `.animate-spin`.
- Todos los `import React` innecesarios.
- Comentario basura de HomePage.

**Refactorizar:**
- Crear `src/utils/formatos.js` con `formatearFecha`, `formatearTitulo`, `formatearApellidoNombres`, `formatearNombresApellido`, `EXCEPCIONES_MINUSCULA`, `generarNroCertificado` (unificar formato).
- Crear `src/components/common/CertificadoLayout.jsx` con `Encabezado`, `CampoFila`, `PieFirmas` y reusarlos en las 4 plantillas.
- Mover `PlantillaComunicado.jsx` a `components/confirmaciones/`.
- En `BautismosPage`: extraer `estadoInicial` a constante y reusar `clasesInput`/`clasesLabel`.
- Dividir `ComunionesPage.jsx` en `LegajoComunion.jsx`, `CertificadoComunion.jsx` y la página.
- Unificar el diseño de certificados (aplicar a Comuniones/Confirmaciones los cambios ya hechos en Bautismos: sin SELLO, sin "Certificamos que:", línea punteada de firma, Certificado N° con Orden).
- Corregir el mapeo Excel de Comuniones para incluir madrina.

**Agregar:**
- `src/utils/` y `src/components/common/` compartidos (hoy no existen utils).
- Commit de los archivos nuevos (`PrintLayout.jsx`, `confirmacionesExcel.js`) — hay cambios sin versionar.
- Actualizar `name` en package.json y `<title>` en index.html ("Sistema de Sacramentos" en vez de "mis-confirmaciones").
- Reemplazar el README raíz (plantilla genérica de Vite) por documentación real del proyecto.
- Si se migra a TypeScript, reactivar los @types (hoy sobran).

## 8. Estado general

**MEJORABLE.** El sistema funciona y cubre los tres módulos, pero arrastra código duplicado (4 plantillas con el mismo encabezado/pie), dos lógicas distintas de "Certificado N°", archivos huérfanos de la plantilla de Vite, CSS muerto y dependencias sin uso. La falta de componentes compartidos hace que cada cambio de diseño (como los aplicados a Bautismos) deba replicarse manualmente en Comuniones y Confirmaciones. Con un refactor de extracción de componentes y utilidades comunes quedaría saludable en poco esfuerzo.
