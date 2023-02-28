import React from "react";
import s from "./Card.module.css"


export default function Card ({name, genres, image, rating, id, createdInDb}) {
   // console.log('SOY EL CREATEDINDB', createdInDb, genres)
return(
    <div className={s.CardContainerAll}>
    <div className={s.CardContainer}>
   
        <h1>{id}</h1>
        <h3 className={s.title}>{name}</h3>
         {/* {genres?.map(el =>(<p>{el}</p>))} */}
         <p className={s.text}>{createdInDb ? genres.map((el) => el.name).join(", ") :genres.join(", ")}</p>
        <h6 className={s.text}>{rating}</h6>
    <img src={image} alt="image not found" width="250px" height="250px"/>
    </div>
    </div>
)
}