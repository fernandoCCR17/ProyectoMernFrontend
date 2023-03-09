import usePacientes from "../hooks/usePacientes";

const Paciente = ({paciente}) => {
    const { setEdicion, eliminarPaciente } = usePacientes()

    const { email, fecha, nombre, propietario, sintomas, _id} = paciente

    const formatearFecha = (fecha) => {
        let nuevaFecha
        if (fecha.includes('T00:00:00.000Z')) {
          nuevaFecha = new Date(fecha.split('T')[0].split('-'))
        } else {
          nuevaFecha = new Date(fecha)
        }
        const opciones = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }
        return nuevaFecha.toLocaleDateString('es-ES', opciones)
      }

  return (
    <div className="mx-5 my-10 bg-white shadow-md py-10 px-5 rounded-xl">
        <p className="font-bold uppercase text-indigo-700 my-1.5">Nombre: {""}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1.5">Propietario: {""}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1.5">Email: {""}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1.5">Fecha de alta: {""}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha)}</span>
        </p>
        <p className="font-bold uppercase text-indigo-700 my-1.5">Sintomas: {""}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button 
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg "
                onClick={() => {setEdicion(paciente)}}
                >Edtiar
            </button>
            
            <button 
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg "
                onClick={() => {eliminarPaciente(_id)}}
            >Eliminar
            </button>
        </div>
    </div>
  )
}

export default Paciente