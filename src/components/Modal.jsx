import React, { useState, useEffect } from 'react'
import Mensaje from './mensaje'
import cerrarBtn from '../img/cerrar.svg'

const Modal = ({
    setModal,
    animarModal,
    setanimarModal,
    guardarGasto,
    gastoEditar }) => {

    const [mensaje, setmensaje] = useState("")

    const [nombre, setnombre] = useState("")
    const [cantidad, setcantidad] = useState("")
    const [categoria, setcategoria] = useState("")
    const [id, setid] = useState('')
    const [fecha, setfecha] = useState('')

    useEffect(() => {
        if (Object.keys(gastoEditar).length > 0) {
            const { id, nombre, cantidad, categoria, fecha } = gastoEditar;
            setnombre(nombre)
            setcantidad(cantidad)
            setcategoria(categoria)
            setid(id)
            setfecha(fecha)
        }
    }, []);

    const ocultarModal = () => {
        setanimarModal(false)
        setTimeout(() => {
            setModal(false)       
        }, 500); 
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {
            setmensaje("Todos los campos son obligatorios")
            setTimeout(() => {
                setmensaje("")
            }, 3000);
            return;
        }

        guardarGasto({nombre, cantidad, categoria, id, fecha})

    }


  return (
    <div className="modal">
          <div className="cerrar-modal">
              <img src={cerrarBtn}
                alt="cerrar modal"
                onClick={ocultarModal}/>
          </div>    

          <form
              onSubmit={handleSubmit}
              className={`formulario ${animarModal ? "animar" : 'cerrar'}`}>
              
              <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
              {mensaje &&
                  <Mensaje tipo="error">
                      {mensaje}
                  </Mensaje>
              }
              <div className="campo">
                  <label htmlFor="nombre">Nombre del Gasto</label>
                  <input
                    id="nombre"
                    type="text"
                    value={nombre}
                    onChange={e => setnombre(e.target.value)}
                    placeholder="Añade el nombre del gasto"/>
              </div>

              <div className="campo">
                  <label htmlFor="cantidad">Cantidad del Gasto</label>
                  <input
                    id="cantidad"
                    type="number"
                    value={cantidad}
                    onChange={e => setcantidad(Number(e.target.value))}
                    placeholder="Añade la cantidad del gasto ej: 300"/>
              </div>

              <div className="campo">
                  <label htmlFor="categoria">Cantidad del Gasto</label>
                  <select id="categoria"
                    value={categoria}
                    onChange={e => setcategoria(e.target.value)}>
                      <option value=""> --- Seleccione </option>
                      <option value="ahorro">Ahorro</option>
                      <option value="comida">Comida</option>
                      <option value="casa">Casa</option>
                      <option value="gastos">Gastos varios</option>
                      <option value="ocio">Ocio</option>
                      <option value="salud">Salud</option>
                      <option value="suscripciones">Suscripciones</option>

                  </select>
              </div>

              <input type="submit"
                  value={gastoEditar.nombre ? "Editar Gasto" : "añadir Gasto"} />

          </form>
    </div>
  )
}

export default Modal