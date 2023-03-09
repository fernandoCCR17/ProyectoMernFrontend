import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/rutaProtegida'

// Area Publica
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import OlvidePassword from './paginas/OlvidePassword'
import NuevoPassword from './paginas/NuevoPassword'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'

// Area Privada
import AdministrarPacientes from './paginas/AdministrarPacientes'

import { AuthProvider } from './context/authProvider' 
import { PacientesProvider } from './context/PacientesProvider' 

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <PacientesProvider>
          <Routes>
            <Route path='/' element={<AuthLayout />}>
              <Route index element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            <Route path='/admin' element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes />}/>
              <Route path='perfil' element={<EditarPerfil />}/>
              <Route path='cambiar-password' element={<CambiarPassword />}/>
            </Route>
          </Routes> 
        </PacientesProvider>  
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
