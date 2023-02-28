import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getVideogameName } from "../../Actions";

export default function SearchBar () {
const dispatch = useDispatch()
const [name, setName] = useState('') // name es el estado y setName es la funcion que modifica ese estado de name

function handleInputChange(e) { //la busqueda por valor de busqueda, para el boton
e.preventDefault()
setName(e.target.value)
}


function handleSubmit (e) { //el nombre que escribe el usuario para buscar, para el input
e.preventDefault()
dispatch(getVideogameName(name))
}

return (
    <div>
        <input
        type= 'text'
        placeholder= 'Buscar...'
        onChange={(e) => handleInputChange(e)}
        />
    <button onClick={(e) => handleSubmit(e)}>Buscar</button>
    </div>
)
}