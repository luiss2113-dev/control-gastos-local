import React, { useState } from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({
    gastos,
    isValidPresupuesto,
    setisValidPresupuesto,
    presupuesto,
    setPresupuesto }) => {

  return (
    <header>
          <h1>Planificador de Gastos</h1>
          {isValidPresupuesto ? (
        <ControlPresupuesto
                  gastos={gastos}
                  presupuesto={presupuesto}/>
          ) :
              <NuevoPresupuesto
                  presupuesto={presupuesto}
                  setPresupuesto={setPresupuesto}
                  setisValidPresupuesto={setisValidPresupuesto}
              />
          }
    </header>
  )
}

export default Header