import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useAuth } from '@/context/AuthContext'

export const CargaDeEspera = ({ text, text2 }) => {
  const { isAuthenticated } = useAuth()
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500 mb-6" />
      {isAuthenticated ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">{text}</h2>
          <p className="text-gray-600 mb-4">{text2}</p>
        </>
      ) : (
        <p className="text-gray-600 mb-4">Por favor espera...</p>
      )}
      <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-pulse w-1/2"></div>
      </div>
    </div>
  )
}
