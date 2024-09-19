import React from 'react'

export const Component3 = ({waterLevel}) => {
  return (
    <div className="flex flex-col items-center border border-dashed border-gray-500 p-10 rounded-lg h-full  ">
          <div className="relative w-32 h-64 bg-gray-400 rounded-md overflow-hidden">
            <div
              className="absolute bottom-0 bg-blue-300 w-full"
              style={{ height: `${waterLevel}%` }}
            ></div>
          </div>
          <p className="mt- font-bold">Bể nước {waterLevel}</p>
        </div>
  )
}
