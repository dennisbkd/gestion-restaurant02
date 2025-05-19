import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const CargaDeEspera = ({ text, text2 }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ArrowPathIcon className="animate-spin h-12 w-12 text-blue-500 mb-6" />
      <h2 className="text-2xl font-semibold mb-2">{text}</h2>
      <p className="text-gray-600 mb-4">{text2}</p>
      <div className="w-64 h-2 bg-gray-300 rounded-full overflow-hidden">
        <div className="h-full bg-blue-500 animate-pulse w-1/2"></div>
      </div>
    </div>
  )
}
