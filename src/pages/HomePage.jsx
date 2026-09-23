import { Link } from 'react-router-dom';

export default function HomePage() {
  const sacramentos = [
    {
      id: 'bautismos',
      titulo: 'Bautismos',
      icono: '✝️',
      descripcion: 'Generación de certificados de Bautismo (Fiel y Parroquia)',
      color: 'from-blue-400 to-blue-600',
      path: '/bautismos',
      stats: 'Activo'
    },
    {
      id: 'comuniones',
      titulo: 'Comuniones',
      icono: '🍞',
      descripcion: 'Registro y certificados de Primera Comunión',
      color: 'from-green-400 to-green-600',
      path: '/comuniones',
      stats: 'Activo'
    },
    {
      id: 'confirmaciones',
      titulo: 'Confirmaciones',
      icono: '🕊️',
      descripcion: 'Generación de comunicados de Confirmación',
      color: 'from-purple-400 to-purple-600',
      path: '/confirmaciones',
      stats: 'Activo'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Encabezado */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Sistema de Gestión de Sacramentos
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Seleccione el sacramento para gestionar sus registros y certificados
        </p>
        <div className="mt-4 inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm">
          <span className="mr-2">📌</span>
          Bautismos, Comuniones y Confirmaciones disponibles
        </div>
      </div>

      {/* Tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {sacramentos.map((sacramento) => (
          <Link
            key={sacramento.id}
            to={sacramento.path}
            className={`
              group relative bg-white rounded-2xl shadow-lg overflow-hidden 
              transition-all duration-300 hover:shadow-2xl hover:-translate-y-1
              hover:scale-105
            `}
          >
            {/* Gradiente de fondo */}
            <div className={`absolute inset-0 bg-gradient-to-br ${sacramento.color} opacity-10`}></div>
            
            <div className="relative p-8">
              {/* Icono */}
              <div className={`
                text-6xl mb-4 transform transition-transform duration-300 
                group-hover:scale-110 group-hover:rotate-3
              `}>
                {sacramento.icono}
              </div>

              {/* Título */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {sacramento.titulo}
              </h3>

              {/* Descripción */}
              <p className="text-gray-600 mb-4">
                {sacramento.descripcion}
              </p>

              {/* Estado */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                  ✅ {sacramento.stats}
                </span>
                <span className="text-blue-600 font-medium group-hover:underline">
                  Gestionar →
                </span>
              </div>

              {/* Borde decorativo */}
              <div className={`
                absolute bottom-0 left-0 right-0 h-1 
                bg-gradient-to-r ${sacramento.color}
                transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300
              `}></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}