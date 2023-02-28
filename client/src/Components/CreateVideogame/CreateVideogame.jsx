import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../../Actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import s from "./CreateVideogame.module.css"

export default function CreateVideogame (){
    const dispatch = useDispatch();
    const Allgenres = useSelector((state) => state.genres);
    const history = useHistory();

    const platformsApi = [
        "PC", "PlayStation 5", "PlayStation 4", "PlayStation 3", "Xbox One", "Xbox Series S/X", "Xbox 360", "Xbox",
        "Nintendo Switch", "Nintendo 3DS", "Nintendo DS", "Nintendo DSi", "iOS", "Android", "macOS", "Linux"];

    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: [],
        image: "",
        genres: [],
      });

      useEffect(() => {
        dispatch(getGenres())
      }, []);


      function handlerChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
      }

    //   function handleCheck(e) {
    //     if(e.target.checked) {
    //         setInput({
    //             ...input,
    //             status: e.target.value
    //         })
    //     }
    //   }

    function handlerSelectGenres (e) {
        setInput({
            ...input,
            genres: [...input.genres, e.target.value]
        })
    }

    function handlerSelectPlatforms (e) {
        setInput({
            ...input,
            platforms: [...input.platforms, e.target.value]
        })
    }

    function handlerDeleteGenres (e) {
        setInput({
            ...input,
            genres: input.genres.filter(el => el !== e)
        })
    }

    function handlerDeletePlatforms (e) {
        setInput({
            ...input,
            platforms: input.platforms.filter(el => el !== e)
        })
    }

    function handlerSubmit (e) {
        e.preventDefault();
        //console.log(input)
        dispatch(postVideogame(input))
        alert("El Videojuego ha sido creado con éxito")
        setInput({
            name: "",
            description: "",
            released: "",
            rating: "",
            platforms: [],
            image: "",
            genres: [],
        })
        history.push('/home')
    }

      return (
<div className={s.backGround}>
    <div className={s.divContainerAll}>
        <div className={s.divContainer}>
            <Link to='/home'><button className={s.button}>Volver</button></Link>
            <h1 className={s.Title}>Creá tu Videojuego</h1>
            <form onSubmit={e => handlerSubmit(e)}>
                <div>
                <div className={s.firstColumn}>
                <div className={s.divCardContainer}>
                    <label className={s.Text}> Nombre:</label>
                    <input
                    type='text'
                    value={input.name}
                    name='name'
                    placeholder='Videogame'
                    onChange={e => handlerChange(e)}
                    required={true}
                    />               
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Descripción:</label>
                    <input
                    type='text'
                    value={input.description}
                    name='description'
                    placeholder='Enter a description'
                    onChange={e => handlerChange(e)}
                    required={true}
                    />
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Fecha de lanzamiento:</label>
                    <input
                    type='text'
                    value={input.released}
                    name='released'
                    onChange={e => handlerChange(e)}
                    />
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Rating:</label>
                    <input
                    type='text'
                    value={input.rating}
                    name='rating'
                    placeholder='0.00 - 5.00'
                    min={0.00}
                    max={5}
                    step={0.01}
                    onChange={e => handlerChange(e)}
                    />
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Select:</label>
                    {/* <input
                    // type='text'
                    // value={input.platforms}
                    // name='platforms'
                    // // onChange={e => handlerChange(e)}
                    /> */}
                    
                     <select required={true} onChange={e => handlerSelectPlatforms(e)}>
                        <option value="default">Plataformas</option>
                    {platformsApi.map((el) =>( 
                        <option key={el.id} value={el}>{el}</option>)
                    )}
                    </select>
                    {/* <ul><li>{input.platforms.map(el => el + " ,")}</li></ul> */}

                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Imagen:</label>
                    <input
                    type='text'
                    value={input.image}
                    name='image'
                    placeholder='Img URL'
                    onChange={e => handlerChange(e)}
                    />
                </div>
                
                <div className={s.divCardContainer}>
                    <label className={s.Text}>Select:</label>
                    <select onChange={e => handlerSelectGenres(e)}>
                    <option value="default">Géneros</option>
                    {Allgenres.map((el) =>( 
                        <option key={el.id} value={el.name}>{el.name}</option>)
                    )}
                    </select>
                    {/* <ul><li>{input.genres.map(el => el + " ,")}</li></ul> */}

                </div>
                </div>
                </div>

                <button type="submit" className={s.button}>Crear Videojuego</button>

            </form>
        </div>
            <div className={s.divPadre}>
            {   input.platforms.length > 0 ? (
                <div className={s.divHijo1}>
                    <p className={s.Text}>Listado de Plataformas</p>
                    <div className={s.divHijo2}>
                    { input.platforms.map( (e, id) =>
                        <div className={s.divHijo3} key={id}>
                            <button className={s.divButton} onClick={()=> {handlerDeletePlatforms(e)}}>X</button>
                            <p className={s.Text}>{e}</p>
                        </div>
                        )}
                    </div>
                 </div>           
                 ): null}   
            {   input.genres.length > 0 ? (
                <div className={s.divHijo1}>
                    <p className={s.Text}>Listado de Géneros</p>
                    <div className={s.divHijo2}>
                     { input.genres.map((e, id) =>
                        <div className={s.divHijo3} key={id}>
                            <button className={s.divButton} onClick={()=> {handlerDeleteGenres(e)}}>X</button>
                            <p className={s.Text}>{e}</p>
                        </div>
                        )}
                    </div>
                </div>           
                ): null}
            </div>
    </div>
</div>
      )
}