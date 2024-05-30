import React from 'react'
import './header.css'

export const Header = ({ content, handler, handlerPlus }) => {
  return (
    <>
      <div className='topNav'>
        <div className='imgNav'>
        <button type='submit' onClick={handler}>Cerrar Sesión</button>
          <h3>Bienvenido: {content}</h3>
        </div>
        <div className='optionsNav'>
        <button type='submit' onClick={handlerPlus}>Crear Clase</button>
        </div>
      </div>
    </>
  )
}
