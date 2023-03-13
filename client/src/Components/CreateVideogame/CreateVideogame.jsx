import React, { useEffect, useState } from "react";
import { Link, useHistory } from 'react-router-dom';
import { postVideogame, getGenres } from '../../Actions/index.js'
import { useDispatch, useSelector } from "react-redux";
import s from "./CreateVideogame.module.css"

export default function CreateVideogame (){
    const dispatch = useDispatch();
    const Allgenres = useSelector((state) => state.genres);
    const history = useHistory();
    const allVideogames = useSelector((state) => state.allVideogames);    

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

    const [errors, setErrors] = useState({
        name: "",
        description: "",
        released: "",
        rating: "",
        platforms: "",
        image: "",
        genres: "",
    })
    // console.log("SOY EL ERRORS", errors)
      useEffect(() => {
        dispatch(getGenres())
      }, []);

      function validate () {
        // console.log("ENTRE VALIDATE")
        // console.log("SOY EL OTRO INPUT", input)

        const inputValues = Object.entries(input) //genera un arreglo de tuplas de un objeto que vos le pases. Las tuplas son mini arreglos donde vos guardas el key por un lado y el valor por el otro.
        const objectError = {}
        const errorsMessages = {

            name: "el nombre es requerido",
            description: "la descripcion es requerida",
            image: "la imagen es requerida",
            released: "La fecha de lanzamiento es requerida",
            rating: "El rating es requerido",
            platforms: "Debes elegir al menos una plataforma",
            genres: "Al menos un genero es requerido"
        }

        inputValues.forEach(([key, value]) => {
            // console.log(key, value)
            if(value === "" || value.length === 0 ) {
                return Object.assign(objectError, { 
                // key: `El ${key} es requerido/a`
                [key]: errorsMessages[key]
            })
            }
        })
        return setErrors(objectError)
    
        // if(input.name === "") {
        //         setErrors({...errors, 
        //             name:"El nombre es requerido"})
        //             // console.log("FINAL IF NAME", errors)
        //     } else {
        //         setErrors({...errors, 
        //             name:""})
        //     } 
      
        // if (input.image === "") {
        //     setErrors({...errors, 
        //     image:"la imagen es requerida"})
        // } else {
        //     setErrors({...errors, 
        //         image:""})
        // } 
        // if (input.description === "") {
        //     // console.log("IF DESCRIPTION", errors)
        //     setErrors({...errors, 
        //         description:"La descripción es requerida"})
        // } else {
        //     setErrors({...errors, 
        //         description:""})
        // } 
        // if (!input.platforms) {
        //     setErrors({...errors, 
        //         platforms:"La plataforma es requerida"})
        // } else {
        //     setErrors({...errors, 
        //         platforms:""})
        // } 
        // if (!input.released) {
        //     setErrors({...errors, 
        //         released:"La fecha de lanzamiento es requerida"})
        // } else {
        //     setErrors({...errors, 
        //         released:""})
        // } 
        // if (!input.rating) {
        //     setErrors({...errors, 
        //         rating:"El rating es requerido"})
        // } else {
        //     setErrors({...errors, 
        //         rating:""})
        // } 
        // if (!input.genres) {
        //     setErrors({...errors, 
        //         genres:"El genero es requerido"})
        // }else {
        //     setErrors({...errors, 
        //         genres:""})
        // }
        // console.log("SOY EL ERRORS", errors)
    }

    useEffect(() => {
        validate()
      }, [input]);


      function handlerChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        // console.log("SOY EL INPUT", input)
        // console.log("SOY EL ERRORS", errors)
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
        if(input.genres?.includes(e.target.value)){
            alert("El género ya fue seleccionado")
        } else {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        }
    }

    function handlerSelectPlatforms (e) {
        if(input.platforms?.includes(e.target.value)) {
            alert("La plataforma ya fue seleccionada")
        }else{
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })

        }
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
        //console.log(input.name)
        // console.log("SOY TARGET NAME",input.name)
        // console.log("SOY EL ALLVIDEOGAMES", allVideogames[0])
        // console.log("Soy el include", allVideogames.includes(input.name))
        if(allVideogames.some((e) => e.name === input.name)){

           return alert("Éste juego ya existe")
        } else {

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
    }

      return (
<div className={s.backGround}>
    <div className={s.divContainerAll}>
        <div className={s.divContainer}>
            <div>
            <h1 className={s.Title}>Creá tu Videojuego</h1>

            </div>
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
                <div className={s.right}>
                    {errors.name&&(<p className={s.TextContainer}>{errors.name}</p>)}               
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
                <div>
                {errors.description&&(<p className={s.TextContainer}>{errors.description}</p>)} 
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Fecha de lanzamiento:</label>
                    <input
                    type='date'
                    value={input.released}
                    name='released'
                    onChange={e => handlerChange(e)}
                    required={true}
                    />
                </div>
                <div>
                    {errors.released&&(<p className={s.TextContainer}>{errors.released}</p>)} 
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Rating:</label>
                    <input
                    type='number'
                    value={input.rating}
                    name='rating'
                    placeholder='0.00 - 5.00'
                    min={0.00}
                    max={5}
                    step={0.01}
                    onChange={e => handlerChange(e)}
                    required={true}
                    />
                </div>
                <div>
                    {errors.rating&&(<p className={s.TextContainer}>{errors.rating}</p>)} 
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Plataformas:</label>
                    {/* <input
                    // type='text'
                    // value={input.platforms}
                    // name='platforms'
                    // // onChange={e => handlerChange(e)}
                    /> */}
                    
                     <select onChange={e => handlerSelectPlatforms(e)}>
                        <option hidden value="default">Selecciona tus Plataformas...</option>
                    {platformsApi.map((el, i) =>( 
                        <option key={i} value={el}>{el}</option>)
                    )}
                    </select>
                    {/* <ul><li>{input.platforms.map(el => el + " ,")}</li></ul> */}
                </div>
                <div>
                    {errors.platforms&&(<p className={s.TextContainer}>{errors.platforms}</p>)}     
                </div>

                <div className={s.divCardContainer}>
                    <label className={s.Text}>Imagen:</label>
                    <input
                    type='text'
                    value={input.image}
                    name='image'
                    placeholder='Img URL'
                    onChange={e => handlerChange(e)}
                    required={true}
                    />
                </div>
                <div></div>
                    {errors.image&&(<p className={s.TextContainer}>{errors.image}</p>)} 
                
                <div className={s.divCardContainer}>
                    <label className={s.Text}>Géneros:</label>
                    <select onChange={e => handlerSelectGenres(e)}>
                    <option hidden value="default">Selecciona tus generos...</option>
                    {Allgenres.map((el) =>( 
                        <option key={el.id} value={el.name}>{el.name}</option>)
                    )}
                    </select>
                    {/* <ul><li>{input.genres.map(el => el + " ,")}</li></ul> */}
                </div>
                <div>
                    {errors.genres&&(<p className={s.TextContainer}>{errors.genres}</p>)}
                </div>
                </div>
                </div>
                <Link to='/home'><button className={s.button}>Volver</button></Link>
                <button type="submit" className={s.buttons} disabled={!input.genres.length || !input.platforms.length}>Crear Videojuego</button>

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