import React from 'react'

const Loading = () => {
  return (
    <div className='w-full h-[100vh] flex justify-center items-center bg-gray-900'>
        <div className="flex gap-5 mt-5">
      <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce delay-0" />
      <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce delay-300" />
    </div>
    </div>
  )
}

export default Loading