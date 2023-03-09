import {useState} from 'react'
import {Link} from 'react-router-dom'
import Alerta from '../components/Alerta'
import clienteAxios from '../config/axios'

const Registrar = () => {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  
  const [alerta, setAlerta] = useState({})

  const handleSubmit = async e => {
    e.preventDefault();

    if([nombre, email, password, repetirPassword].includes('')){
      setAlerta({msg: 'Hay campos vacios', error: true});
      return;
    }
    
    if(password !== repetirPassword){
      setAlerta({msg: 'Las contraseñas son diferentes', error: true});
      return;
    }
    
    if(password.length < 6){
      setAlerta({msg: 'La contraseña es muy corta, ingrese minimo 6 caracteres', error: true});
      return;  
    }
    setAlerta({});
    
    // Crear el usuario en la API
    try {
      await clienteAxios.post('/veterinarios', {nombre, email, password})
      setAlerta({
        msg: 'Cuenta creada correctamente, revisa tu correo',
        error: false
      })
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('')
      setTimeout(() => {
        setAlerta({});
      }, 3000);
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alerta

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""}
          <span className="text-black">tus Pacientes</span>
        </h1>
      </div>

      <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta 
          alerta={alerta}
        />}
        <form action=""
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="">
              Nombre
            </label>

            <input 
              type="text" 
              name="" 
              placeholder="Tu Nombre" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              id="" 
              value={nombre}
              onChange= {e => setNombre(e.target.value)}
            />
          </div>{/* Termina el campo nombre */}

          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="">
              Email
            </label>

            <input 
              type="email" 
              name="" 
              placeholder="Email de Registro" 
              id="" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              value={email}
              onChange= {e => setEmail(e.target.value)}
            />
          </div>{/* Termina el campo email */}
          
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="">
              Password
            </label>

            <input 
              type="password" 
              name="" 
              placeholder="Tu Password" 
              id="" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              value={password}
              onChange= {e => setPassword(e.target.value)}
            />
          </div>{/* Termina el campo password */}

          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="">
              Repetir Password
            </label>

            <input 
              type="password" 
              name="" 
              placeholder="Repite tu Password" 
              id="" 
              className="border w-full p-3 mt-3 bg-gray-50 rounded-xl" 
              value={repetirPassword}
              onChange= {e => setRepetirPassword(e.target.value)}
            />
          </div>{/* Termina el campo repetir password */}


          <input 
            type="submit" 
            value="Crear Cuenta" 
            className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/">¿Ya tienes una cuenta? Inicia Sesión</Link>
            <Link 
              className='block text-center my-5 text-gray-500'
              to="/olvide-password">Olvide mi password</Link>
          </nav>
      </div>
    </>
  )
}

export default Registrar