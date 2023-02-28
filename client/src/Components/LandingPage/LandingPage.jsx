import React from "react";
import { Link } from "react-router-dom";
import s from "./LandingPage.module.css";

export default function LandingPage () {
    return (
        <div className={s.divContainer}>
            <hi className={s.Title}>WELCOME TO VIDEOGAMES APP</hi>
            <Link to = '/home'>
            <button className={s.button}>PRESS START</button>
            </Link>
        </div>
    )
}