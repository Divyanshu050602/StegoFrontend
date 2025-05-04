import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <div>
        <h1 className="text-7xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-purple-600 p-4 rounded-lg">
          Secure Steganography
        </h1>

        <div className="container mx-auto flex justify-center gap-10">
          {/* Encryption Box  */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-80">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Encryption</h2>
            <Link className="bg-blue-600 px-4 py-2 rounded text-white" to="/Encryption">Go to Encryption</Link>
          </div>
          
          {/* Decryption Box */}
          <div className="bg-gray-800 p-6 rounded-lg text-center w-80">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Decryption</h2>
            <Link className="bg-green-600 px-4 py-2 rounded text-white" to="/Decryption">Go to Decryption</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
