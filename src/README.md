📖 Manual Técnico: Generador Local de Actas de Confirmación
1. Resumen Ejecutivo
Sistema de escritorio basado en tecnologías web (SPA - Single Page Application) diseñado para procesar archivos de Excel (.xlsx) y generar vistas de impresión de "Comunicados de Confirmación". El sistema optimiza el papel imprimiendo exactamente dos actas por cada hoja tamaño A4, replicando el formato oficial de la Diócesis de Catamarca.
1.1. Decisión Arquitectónica (Frontend-Only)
Se descartó el uso de bases de datos (MongoDB) y servidores (Node.js/Express) por las siguientes razones:
•	Origen de los datos: El usuario mantiene un archivo Excel local que funciona como su base de datos.
•	Privacidad: Al no tener backend, los datos de los feligreses (DNI, domicilios, nombres) nunca salen de la computadora local. Todo se procesa en la memoria RAM del navegador.
•	Simplicidad: Elimina la necesidad de autenticación (JWT) y mantenimiento de servidores.
1.2. Tecnologías Utilizadas
•	React (v18): Motor de renderizado de la interfaz de usuario.
•	Vite: Herramienta de empaquetado y servidor de desarrollo ultrarrápido.
•	TailwindCSS (v4): Framework de utilidades CSS para estructurar el diseño y controlar las reglas de impresión.
•	SheetJS (xlsx): Librería encargada de leer el archivo binario de Excel y convertirlo en un formato JSON manejable por React.
2. Estructura Exacta del Proyecto
Una vez instaladas las dependencias (npm install), la estructura interna del proyecto web es la siguiente:
Plaintext
mis-confirmaciones/
├── node_modules/                # Dependencias instaladas (ignoradas en git)
├── public/                      # Archivos estáticos (íconos, logos si los hubiera)
├── src/                         # CÓDIGO FUENTE PRINCIPAL
│   ├── App.jsx                  # Lógica central: carga de Excel y paginación
│   ├── PlantillaComunicado.jsx  # Diseño visual del acta (Flexbox y bordes)
│   ├── index.css                # Estilos globales y motor de reglas de impresión
│   └── main.jsx                 # Punto de montaje de React en el DOM
├── index.html                   # Plantilla HTML principal
├── package.json                 # Listado de dependencias y scripts (dev, build)
└── vite.config.js               # Configuración de Vite y plugins (React + Tailwind v4)
3. Análisis Detallado de los Componentes
3.1. Motor de Impresión CSS (src/index.css)
Este archivo es el responsable de que el navegador entienda cómo tratar la hoja al momento de imprimir.
•	@page { size: A4; margin: 0; }: Fuerza a la impresora a usar el formato A4 (210x297mm) y elimina los márgenes en blanco que los navegadores agregan por defecto.
•	print-color-adjust: exact;: Obliga a la impresora a renderizar los fondos y bordes tal cual se ven en la pantalla, evitando que el navegador los elimine para "ahorrar tinta".
3.2. Lógica de Procesamiento (src/App.jsx)
Consta de tres fases operativas:
1.	Lectura (File API + SheetJS): Un input type="file" captura el Excel. FileReader lee el archivo como un ArrayBuffer y xlsx lo convierte en un arreglo de objetos de JavaScript.
2.	Paginación (Chunking): Un bucle for recorre el arreglo de datos y los agrupa de a dos (ej. [[Dato1, Dato2], [Dato3, Dato4], [Dato5]]).
3.	Renderizado Condicional: * En pantalla (print:hidden), muestra la interfaz de carga y el botón de imprimir.
o	Al imprimir (print:block), oculta la interfaz y despliega los contenedores A4 (w-[210mm] h-[297mm]). Utiliza break-after-page en cada contenedor para saltar a la siguiente hoja de papel.
3.3. Maquetación del Acta (src/PlantillaComunicado.jsx)
Replica el formulario en papel mediante Flexbox.
•	Estructura Dinámica: Se usan clases como flex items-end junto con border-b border-black. Esto permite que si un nombre es muy largo o muy corto, la línea negra inferior se adapte automáticamente al ancho restante de la página.
•	Inyección de Datos: El componente recibe un objeto data y mapea las propiedades (ej. {data['DNI']}) directamente en los espacios correspondientes.
4. Diccionario de Datos del Excel (Requisito Estricto)
Para que el mapeo de React funcione, el archivo Excel debe cumplir dos reglas de oro:
1.	Formato de Celdas: Las columnas de Fechas, Teléfonos y DNI deben estar formateadas como Texto en Excel (para que SheetJS no altere los ceros a la izquierda ni el formato de fecha).
2.	Nomenclatura: La Fila 1 (encabezados) debe tener exactamente estos nombres:
Categoría	Nombres Exactos de Columna requeridos en Excel
Identificación	Acta Nro, Apellido y Nombres, DNI
Nacimiento	Localidad Nacimiento, Fecha Nacimiento
Filiación	Padre, Madre, Domicilio, Telefono
Bautismo	Parroquia Bautismo, Diocesis Bautismo, Fecha Bautismo, Libro Bautismo, Folio Bautismo
Confirmación	Lugar Confirmacion, Fecha Confirmacion, Delegado Celebrante, Padrino o Madrina, Libro Confirmacion, Folio Confirmacion
Emisión (Pie)	Dia Emision, Mes Emision, Anio Emision
5. Guía de Ejecución y Uso
Arranque del Sistema
1.	Abrir la terminal en la carpeta del proyecto (mis-confirmaciones).
2.	Ejecutar el comando de desarrollo:
Bash
npm run dev
3.	Abrir el navegador en la dirección local proporcionada (generalmente http://localhost:5173).
Flujo de Trabajo
1.	Actualizar el Excel: El usuario abre su archivo datos.xlsx de forma local, añade a los nuevos confirmados y guarda el archivo.
2.	Cargar: En la aplicación web, hace clic en "Seleccionar archivo" y busca el Excel.
3.	Visualizar: Inmediatamente aparecerá el botón indicando "Imprimir X Reportes".
4.	Imprimir: Al hacer clic, se abre el cuadro de diálogo de la impresora.
5.	Ajustes de Impresora: * Tamaño: A4.
o	Márgenes: Ninguno / Personalizado a 0.
o	Opciones: Marcar "Gráficos de fondo".
6.	Confirmar: Clic en "Imprimir" o "Guardar como PDF".

