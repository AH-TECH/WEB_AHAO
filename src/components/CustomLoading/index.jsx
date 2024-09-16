import React from 'react'

const CustomLoading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full absolute inset-0 bg-transparent ">
      <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500 border-t-transparent"></div>
    </div>
  )
}

export default CustomLoading