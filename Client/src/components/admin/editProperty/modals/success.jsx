import React from 'react'
import {Link} from 'react-router-dom'

export default function Success (message, route) {
    console.log("soy el msj", message)
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute bg-black opacity-50 inset-0"></div>
        <div className="relative bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Successful operation!</h2>
          <p className="text-gray-700">{message}</p>
          <div className="mt-4 flex justify-center">
            <Link to={route}>
            <button className="bg-fuchsia-900 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
              OK
            </button>
            </Link>
          </div>
        </div>
      </div>
      
    )
}