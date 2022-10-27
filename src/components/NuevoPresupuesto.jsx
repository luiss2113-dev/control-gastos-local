import React, { useState } from 'react'
import Mensaje from './mensaje'

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, setisValidPresupuesto }) => {
  
  const [mensaje, setmensaje] = useState("")
  
  const handlePresupuesto = (e) => {
    e.preventDefault();
    if (!(presupuesto) || (presupuesto) < 0) {
      
      setmensaje("No es un presupuesto válido")
      //evito ejecución de código
      return 
    }
    
    setmensaje("")
    setisValidPresupuesto(true)
  }
  
  return (
      <div className="contenedor-presupuesto  contenedor sombra">
          <form onSubmit={handlePresupuesto} className="formulario">
            <div className="campo">
                <label>Definir Presupuesto</label>
                <input
                    type="number"
                    className="nuevo-presupuesto"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={(e)=> setPresupuesto(Number(e.target.value))}
                />
            </div>
        <input type="submit" value="Añadir" />
        {
          mensaje &&
          <Mensaje tipo="error">
            {mensaje}
          </Mensaje>
        }
         </form>
    </div>
  )
}

export default NuevoPresupuesto