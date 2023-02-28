import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from '../../Actions/index.js'
import { useEffect, useState } from "react";
import s from "./Detail.module.css"

export default function Detail (props) {
        // console.log("SOY EL PROPS", props.match.params)

        const dispatch = useDispatch()
        let myVideogame = useSelector((state) => state.detail)

        // function resetMyvideogame(){
        //     console.log("DESMONTANDING")
        //     myVideogame = {
                
        //     }

        // }

        const [loading, setLoading] = useState(true)
        if(myVideogame.length !== 0){
            // console.log(myVideogame)
        const fraseDescriptionFirst = myVideogame.description.split("<p>").join()
        var fraseFinal = fraseDescriptionFirst.split("</p>").join()
        }
        useEffect(()=> {
            const getDetailsGame = async () => {
                dispatch(getDetail(props.match.params.id))

            }

        getDetailsGame().then((res) => {
            setLoading(false)
            return res
        }
        )

        },[])

        
        
        
        // useEffect(()=> {
        //     return resetMyvideogame()
        // },[myVideogame])
    
    // console.log("SOY EL DETAIL", myVideogame)
    // console.log("SOY EL DETAIL", myVideogame.platforms)
// console.log("SOY MYVIDEOGAME", myVideogame)
return loading?(<>Loading...</>): (
<div>
        
       {
            myVideogame !== null ?
    <div className={s.CardContainerAll}>
        <div className={s.CardContainer}>
        <h1 className={s.Title}>VIDEOJUEGO: {myVideogame?.name}</h1>
        <img src={myVideogame?.image}  alt="" width="600px" height="500px"/>
                        <p className={s.Text}>Fecha de lanzamiento: <span>{myVideogame?.released}</span>
            
                        </p>
                        <p className={s.Text}>Rating: <span>{myVideogame?.rating}</span>

                        </p>
                        <p className={s.Text}>Plataformas: <span>{Array.isArray(myVideogame.platforms)? myVideogame.platforms.join(", ") : "Plataforma sin especificar"}</span>
                            
                        </p>
                        <p className={s.Text}>Géneros: {myVideogame.genres?.join(", ") }

                        </p>
        </div>
                    <div className={s.TextContainerAll}>
                        <p className={s.TextContainer}>{fraseFinal}</p>
                    </div>

    </div> :                <p className={s.Title}>Loading...</p>
       }
                    <div> <Link to='/home'>
                        <button className={s.button}>Volver</button>
                    </Link>
                    </div>
                   

</div>


            
    )
}