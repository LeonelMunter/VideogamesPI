import React from "react";
import s from "./Pagination.module.css";

export default function ({videogamesPerPage, allVideogames, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i)
        
    }
    return (
        <nav>
            <ul className={s.ul}>
                {pageNumbers && pageNumbers.map(number => (
                    <button className={s.button} key={number}> 
                    <a onClick={() => paginado(number)}>{number}</a>
                    </button>
                    ))}
            </ul>
        </nav>
    )
}