

export const Task = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Task</h1>
        <p className="text-gray-600">This is your minimalistic task component.</p>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
          Complete Task
        </button>
      </div>
    </div>
  )
}
