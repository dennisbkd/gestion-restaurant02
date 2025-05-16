export default function SuccessModal({ setIsOpen, message, refresh }) {
  return (
    <>
      <>
        {/* Overlay */}
        <div
          className='fixed inset-0 z-40 backdrop-blur-sm'
          onClick={() => setIsOpen(false)}
        />

        {/* Modal Content */}
        <div className='fixed top-1/2 left-1/2 w-full max-w-lg px-4 transform -translate-x-1/2 -translate-y-1/2 z-50'>
          <div className='bg-white rounded-md shadow-lg px-4 py-6'>
            <div className='flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-5 h-5 text-green-600'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <h2 className='text-lg font-medium text-gray-800 text-center mt-3'>
              Solicitud enviada
            </h2>
            <p className='mt-1 text-sm leading-relaxed text-center text-gray-500'>
              {message}
            </p>
            <div className='items-center gap-2 mt-3 text-sm sm:flex'>
              <button
                onClick={() => {
                  setIsOpen(false)
                  refresh()
                }}
                className='w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2'
              >
                Volver
              </button>
            </div>
          </div>
        </div>
      </>
    </>
  )
}
