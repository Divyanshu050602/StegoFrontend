import React from 'react'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <div className='w-full flex justify-center bg-gray-900 text-white p-3'>
        <ul className=' flex flex-row gap-3'>
            <li>
                <Link to='/'>Home</Link>
            </li>
            <li>
                <Link to='/Encryption'>Encryption</Link>
            </li>
            <li>
                <Link to='/Decryption'>Decryption</Link>
            </li>
        </ul>
    </div>
  )
}

export default Navbar