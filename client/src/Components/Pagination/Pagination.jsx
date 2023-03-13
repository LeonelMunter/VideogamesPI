import React from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./Pagination.module.css";
import { setCurrentPage } from "../../Actions";

export default function ({videogamesPerPage, allVideogames, active, setActive}) {
    const pageNumbers = [];

const dispatch = useDispatch()
const currentPage = useSelector((state) => state.actualPage)

function handlerClick (event, number) {
event.preventDefault()
dispatch(setCurrentPage(number))
setActive({[event.target.name]: true})
}

function handlerNext (e) {
e.preventDefault()
dispatch(setCurrentPage(currentPage + 1))
setActive({[currentPage + 1]: true})
}

function handlerPrev (e) {
e.preventDefault()
dispatch(setCurrentPage(currentPage - 1))
setActive({[currentPage - 1]: true})
}

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return (
        <nav>
            <ul className={s.ul}>
                {<button onClick={handlerPrev} disabled={currentPage === 1}>Anterior</button>}
                {pageNumbers && pageNumbers.map(number => (
                    <button name={number} value={currentPage} key={number} onClick={(event) => handlerClick(event, number)} className={active[number]? s.buttonActual : s.button}> 
                    <a onClick={() => setCurrentPage(number)}>{number}</a>
                    </button>
                    ))}
                {<button onClick={handlerNext} disabled={!allVideogames || currentPage === Math.ceil(allVideogames/videogamesPerPage)}>Siguiente</button>}
            </ul>
        </nav>
    )
}