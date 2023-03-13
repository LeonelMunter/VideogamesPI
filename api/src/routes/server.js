//const express = require("express");
const { Router } = require('express');
const { getAllVideogames, getGameById, getGameByName, postAddGame} = require('./controllers.js')
const router = Router();






/////////////////////////////////////ROUTE/////////////////////////////
router.get("/", async (req, res) => {
    //no hay request
    try {
        const { name } = req.query;
        
        //let results = [];
         if (!name){
            var results = await getAllVideogames();
        } else {
            var results = await getGameByName(name);
        }
        if(results.length === 0) {
            return res.status(200).send('The query parameter not matches with a game')
        }
        
        res.status(200).send(results)
        // const results = await getAllVideogames();
        // res.status(200).send(results)        
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
});
// Obtiene un arreglo de objetos, donde cada objeto es un videojuego con su información.

router.get("/:idVideogame", async (req, res) => {
    try {      
        const { idVideogame } = req.params;
        const results = await getGameById(idVideogame);
        res.status(200).json(Array.isArray(results)? results[0] : results);
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
});

// Esta ruta obtiene el detalle de un videojuego específico. Es decir que devuelve un objeto con la información pedida en el detalle de un videojuego.
// El videojuego es recibido por parámetro (ID).
// Tiene que incluir los datos del género del videojuego al que está asociado.
// Debe funcionar tanto para los videojuegos de la API como para los de la base de datos.


// router.get("/", async (req, res) => {
//     try {
//         const { name } = req.query;
//         console.log("QUERY NAME", name)
//         const results = await getGameByName(name);
//         res.status(200).json(results);
//     } catch (error) {
//         console.log(error)
//         res.status(404).json({ error: error.message })
//     }
//     }) 

// Esta ruta debe obtener los primeros 15 videojuegos que se encuentren con la palabra recibida por query.
// Debe poder buscarlo independientemente de mayúsculas o minúsculas.
// Si no existe el videojuego, debe mostrar un mensaje adecuado.
// Debe buscar tanto los de la API como los de la base de datos.

router.post("/", async (req, res) => {
    try {
        const { name, description, released, rating, platforms, image, genres} = req.body
        const createGames = await postAddGame( name, description, released, rating, platforms, image, genres)
        res.status(200).json(createGames)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

// Esta ruta recibirá todos los datos necesarios para crear un videojuego y relacionarlo con sus géneros solicitados.
// Toda la información debe ser recibida por body.
// Debe crear un videojuego en la base de datos, y este debe estar relacionado con sus géneros indicados (al menos uno).



module.exports = router;