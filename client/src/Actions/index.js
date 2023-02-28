import axios from 'axios';

export function getVideogame () {
    try {
        return async function(dispatch){
            const info1 = await axios.get('http://localhost:3001/videogames');
            return dispatch({
                type: 'GET_VIDEOGAMES',
                payload: info1.data
            })
    
        }
        
    } catch (error) {
        console.log(error)
    }
}

export function getVideogameName (name) {
    return async function (dispatch) {
        try {
            const info2 = await axios.get('http://localhost:3001/videogames?name=' + name);
            return dispatch({
                type: 'GET_NAME_VIDEOGAME',
                payload: info2.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postVideogame (payload) {
    // console.log("SOY EL PAYLOAD", payload)
    return async function (dispatch) {
        try {
            const info3 = await axios.post('http://localhost:3001/videogames', payload);
            return dispatch({
                type: 'POST_VIDEOGAME',
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getGenres () {
    return async function (dispatch) {
        try {
            const info3 = await axios.get('http://localhost:3001/genres');
            return dispatch({
                type: 'GET_GENRES',
                payload:  info3.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDetail (id) {
    // console.log("SOY EL ID", id)
    return async function (dispatch) {
        try {
            const info4 = await axios.get('http://localhost:3001/videogames/' + id)
            // console.log("SOY EL INFO", info4.data)
            const newInfo = {...info4.data, genres: info4.data.genres.map((e) =>
                {   
                return e.name? e.name : e
                })}
            return dispatch({
                type: 'GET_DETAIL',
                payload:  newInfo
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function filterVideoGamesByStatus (payload) {
    return {
        type: 'FILTER_BY_STATUS',
        payload
    }
}

export function filterCreated (payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName (payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function orderByRating (payload){
    return{
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function filterByGenres (payload){
    return {
        type: 'FILTER_BY_GENRES',
        payload
    }
}

