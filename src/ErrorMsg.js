import React from 'react'
import './App.css'

const ErrorMsg = (props) => {
  return (
    <div>
      <h1 className='red'>{props.children}</h1>
    </div>
  )
}

export default ErrorMsg
