import React from "react";
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideogame, filterCreated, orderByName, orderByRating, filterByGenres, getGenres, setCurrentPage } from "../../Actions/index";
import { Link } from "react-router-dom";
import Card from '../Card/Card';
import Paginado from "../Pagination/Pagination";
import s from "../Card/Card.module.css";
import a from "./HomePage.module.css";
import SearchBar from "../SearchBar/SearchBar";


export default function Home () {
    const dispatch = useDispatch();
    const allVideogames = useSelector ((state) => state.videogames);
    // console.log("SOY EL ALL", allVideogames)
    const allGenres = useSelector ((state) => state.genres);
    // const [currentPage, setCurrentPage] = useState(1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15)
    const currentPage = useSelector((state) => state.actualPage)
    const [active, setActive] = useState({[currentPage]: true})
    const [orden, setOrden] = useState('')
    const indexofLastVideogame = currentPage * videogamesPerPage
    const indexOfFirstVideogame = indexofLastVideogame - videogamesPerPage
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexofLastVideogame)
    // console.log("SOY CURRENT", currentVideogames)

    // const paginado = (pageNumber) => {
    //     setCurrentPage(pageNumber)
    // };

    useEffect(()=> {
        dispatch(getVideogame())
        dispatch(getGenres())
    },[]
    );
    
    function handleClick(e) {
        e.preventDefault();
        dispatch(getVideogame())
    };

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
    };

    function handlerFilterGenres(e){
        e.preventDefault();
        if(e.target.value !== 'genres'){
            // console.log("ENTRE HANDLER FILTER CASO DISTINTO DE GENRES")
            dispatch(filterByGenres(e.target.value))
        } else {
            // console.log("GENRES")
            dispatch(getVideogame)
        }
    }

    function handlerSortByRating(e){
        e.preventDefault();
        dispatch(orderByRating(e.target.value))
    }
    function handleSort(e) {
        e.preventDefault();
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrden(`Ordenado ${e.target.value}`)
    };

    // function handler() {
    //     alert("El juego no existe")
    // }


    return (
        <div>
        <Link to= '/videogames' className={a.button}>Crear Videogame</Link>
        <h1  className={a.Title}>VIDEOGAMES</h1>
        <button onClick={e=> handleClick(e)}>Volver a cargar todos los videojuegos</button>
        <div>
            <select onChange={e => handleSort(e)}>
                <option value= 'asc'>Ascendente</option>
                <option value= 'desc'>Descendente</option>
            </select>
            <select onChange={e => handleFilterCreated(e)}>
            <option value='All'>All</option>
            <option value='api'>API</option>
            <option value='created'>Created</option>
            </select>
            <select onChange={e => handlerSortByRating(e)}>
            <option value= 'All'>Rating</option>
            <option value= 'minmax'>Rating: + a -</option>
            <option value= 'maxmin'>Rating: - a +</option>
            </select>
            <select onChange={e => handlerFilterGenres(e)}>
            <option value= 'genres'>Generos</option>
            {
                allGenres.map(el => {
                    return (
                        <option key={el.id} value={el.name}>{el.name}</option>
                    )
                }) 
            }
            </select>

        <Paginado videogamesPerPage={videogamesPerPage}
        allVideogames={allVideogames.length}
        active={active} setActive={setActive}/>

    <SearchBar/>
    
        <div className={s.CardsContainer}>
    { 
            Array.isArray(currentVideogames)? currentVideogames?.map(el => {
        return (
            <div>
                <Link to={'/home/' + el.id}>
                <Card name={el.name} image={el.image} genres={el.genres} rating={el.rating} createdInDb={el.createdInDb}></Card>
                </Link>
            </div> 
    )
            }) : <div className={a.TextContainer}><p className={a.Text}>El Videojuego no se ha encontrado, apretar en el botón "volver a cargar"...</p>
            {/* <Link to={'/home'} className={a.button}>Volver</Link> */}
            
            </div>
        }
        </div>

        </div>
    </div>
    )
}
