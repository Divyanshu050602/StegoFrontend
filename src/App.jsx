import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './pages/Home';
import Encryption from './pages/Encryption';
import Decryption from './pages/Decryption';
import Navbar from './pages/Navbar'

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>
      <Navbar/>
      <Home/>
    </div>,
  },
  {
    path: "/Encryption",
    element: 
    <div>
      <Navbar/>
      <Encryption/>
    </div>,
  },
  {
    path: "/Decryption",
    element: 
    <div>
      <Navbar/>
      <Decryption/>
    </div>,
  },
  
]);

function App() {
    return (
      <div className="w-[100vw] h-[100vh] bg-gray-900">
        <RouterProvider router={router} />
      </div>
    );
}

export default App;
