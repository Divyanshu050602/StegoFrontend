import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen px-4">
      <div className="w-full max-w-5xl">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg">
          Secure Steganography
        </h1>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          {/* Encryption Box */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-full max-w-xs">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Encryption</h2>
            <Link className="bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-700 transition" to="/Encryption">
              Go to Encryption
            </Link>
          </div>

          {/* Decryption Box */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-full max-w-xs">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">Decryption</h2>
            <Link className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700 transition" to="/Decryption">
              Go to Decryption
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
