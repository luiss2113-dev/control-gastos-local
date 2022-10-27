import { useState, useEffect } from 'react'
import Header from './components/Header'
import ListadoGastos from './components/ListadoGastos'
import Modal from './components/Modal'
import { generarId } from './helpers'
import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setgastos] = useState([])

  const [presupuesto, setPresupuesto] = useState(0)
  const [isValidPresupuesto, setisValidPresupuesto] = useState(false)
  
  const [modal, setmodal] = useState(false)
  const [animarModal, setanimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({});

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0) {
      setmodal(true)
      setTimeout(() => {
        setanimarModal(true)
      }, 500);
    }
  }, [gastoEditar])
  

  const handleNuevoGasto = () => {
    
    setmodal(true)
    setGastoEditar({})
      
    setTimeout(() => {
      setanimarModal(true)
    }, 500);
   
  }

  const guardarGasto = gasto => {
    if (gasto.id) {
      
      const gastosActualizados = gastos.map(gastoState =>
        gastoState.id === gasto.id ? gasto : gastoState)

      setgastos(gastosActualizados);

    } else {
      
    gasto.id = generarId()
    gasto.fecha = Date.now()
      setgastos([...gastos, gasto])
      
    }

    setanimarModal(false)
        setTimeout(() => {
            setmodal(false)       
        }, 500); 
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id != id)
     setgastos(gastosActualizados);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        isValidPresupuesto={isValidPresupuesto}
        setisValidPresupuesto={setisValidPresupuesto}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
      />
      {isValidPresupuesto && 
        <>
         <main>
          <ListadoGastos gastos={gastos}
            setGastoEditar={setGastoEditar}
            eliminarGasto={eliminarGasto}
          />
         </main>
         <div className="nuevo-gasto">
          <img src={IconoNuevoGasto}
            alt="Icono nuevo gasto"
            onClick={handleNuevoGasto}
          />
        </div>
        </>
      }

      {modal &&
        <Modal
        setModal={setmodal}
        animarModal={animarModal}
        setanimarModal={setanimarModal}
        guardarGasto={guardarGasto}
        gastoEditar={gastoEditar}
        />
      }

    </div>
  )
}

export default App
