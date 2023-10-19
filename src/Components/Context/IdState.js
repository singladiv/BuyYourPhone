import React from 'react'
import IdContext from './IdContext';
import { useState, useContext} from 'react'

const IdState = (props) => {
   const [id, setId] = useState("");
  return (
    <div>
        <IdContext.Provider value={{id, setId}}>
            {props.children}
        </IdContext.Provider>
    </div>
  )
}

export default IdState
