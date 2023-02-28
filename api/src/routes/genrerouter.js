const { Router } = require('express');
const router = Router();
require("dotenv").config();
const { Videogame, Genre } = require('../db.js');
const { YOUR_API_KEY } = process.env;
const {getApiInfo, getBdInfo, getAllVideogames, getGameById, getGameByName, postAddGame, getGenres} = require('./controllers.js')


router.get("/", async (req, res) => {
    try {
        const infoGenres = await Genre.findAll()
        res.status(200).json(infoGenres)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

// Obtiene un arreglo con todos los géneros existentes de la API.
// En una primera instancia, cuando la base de datos este vacía, deberás guardar todos los géneros que encuentres en la API.
// Estos deben ser obtenidos de la API (se evaluará que no haya hardcodeo). Luego de obtenerlos de la API, deben ser guardados en la base de datos para su posterior consumo desde allí.

module.exports = router