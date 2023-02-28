const { Videogame, Genre } = require('../db.js');
const axios = require('axios');
require("dotenv").config();
const { YOUR_API_KEY } = process.env;


//-----------------------PARA TRAER TODOS LOS JUEGOS DE LA API--------------------------------


const getApiInfo = async () => {
    
try {
    let result = [];
    for (let i = 1; i < 6; i++) {
        const element = await axios.get(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${i}`)
        result = [...result, ...element.data.results]
    }
    
    let allGames = result.map(el => {
       const generos = el.genres.map(genres => {
        return genres.name
       }) 
       const plataforma = el.platforms.map(platforms => {
        return platforms.platform.name
       })

        return {
            id: el.id,
            name: el.name,
            description: el.description,
            released: el.released,
            rating: el.rating,
            platforms: plataforma,
            image: el.background_image,
            genres: generos,
        }
    });
    return allGames
} catch (error) {
    console.log(error)
}
    
};

//-------------------------PARA TRAER TODOS LOS JUEGOS DE LA BD-----------------------
const getBdInfo = async () => {
    try {
        let dbInformation = await Videogame.findAll({
            include: {
                model: Genre,
                attributes: [ 'name' ],
                throught: {
                    attributes: [],
                },
            }
        });
    
        return dbInformation;
    } catch (error) {
        console.log(error)
    }
 
}
//--------------------- Para traer todos los videojuegos (TANTO DE API COMO DE BD) ----------------------------------
const getAllVideogames = async () => {
    try { 
        const apiInfo = await getApiInfo();
        const dbInfo = await getBdInfo();
        const infoTotal = [...apiInfo, ...dbInfo];
        return infoTotal;
    } catch (error) {
        console.log(error)
    }
}


//--------------------- Pasar un juego por id ---------------------------------
const getGameById = async (idVideogame) => {
    try {
        // console.log("SOY EL IDVIDEOGAME", idVideogame)
        // console.log("SOY EL IDVIDEOGAME", typeof idVideogame)
        if(idVideogame.length < 5) {
            const infoApi = await axios.get(`https://api.rawg.io/api/games/${idVideogame}?key=${YOUR_API_KEY}`)
            let infoGame = {
                     id: infoApi.data.id,
                     name: infoApi.data.name,
                     description: infoApi.data.description,
                     released: infoApi.data.released,
                     rating: infoApi.data.rating,
                     platforms: infoApi.data.platforms.map(el => el.platform.name),
                     image: infoApi.data.background_image,
                     genres: infoApi.data.genres.map(el => el.name),
                 }
                
             return infoGame

        } else {
            const infoDB = await getBdInfo()
           
            let infoVideogameDB = infoDB.filter(Videogame => idVideogame == Videogame.id);
           
            return infoVideogameDB
        }
    } catch (error) {
        console.log(error)
    }

}


//---------------------- Para pasar los 15 primeros videojuegos por nombre ------------------------

const getGameByName = async (name) => {
    try {
        let result = [];
        const infoApi = await getAllVideogames()
        result = infoApi.filter(game => game.name.toLowerCase().includes(name.toLowerCase()) )
        if(result.length > 15) {
            result = result.slice(0, 15)
        }
             return result
    } catch (error) {
        throw Error (error.message);
    }
}

const postAddGame = async ( name, description, released, rating, platforms, image, genres) => {
    try {
        if( !name || !description || !platforms) throw Error("The necessary parameters to create the video game were not received");
    //traer todos los generos que coincidan con todos los generos que me pasaron
    
        const genresToAdd = await Genre.findAll({
            where: {
              name: genres,
            }
        });
        const newPost = await Videogame.create({    
            name,
            description,
            released,
            rating,
            platforms,
            image,
            createdInDb: true,
        });
    
        newPost.addGenre(genresToAdd)
        return newPost
    } catch (error) {
        console.log(error)
    }
}

const getGenres = async () => {
    try {
        let generos = [];
        const allGames = await getApiInfo()
        allGames.forEach(game => {
            game.genres.forEach(genre =>{
                if(!generos.includes(genre)) {
                    generos.push(genre)
                }})
        })
      
        generos.forEach(async (genre) => {
            await Genre.findOrCreate({
            where: {
              name: genre,
                     }
            })
    
        })

    } catch (error) {
        console.log(error)
    }
}


module.exports = {getApiInfo, getBdInfo, getAllVideogames, getGameById, getGameByName, postAddGame, getGenres};