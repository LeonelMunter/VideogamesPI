const initialState = {
    videogames: [],
    allVideogames: [],
    genres: [],
    detail: [],
    actualPage: 1,
}


function rootReducer (state= initialState, action) {
    switch(action.type) {
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        
        case 'GET_GENRES':
            return {
                ...state,
                genres: action.payload 
            }

        case 'POST_VIDEOGAME':
            return {
                ...state
            }

        case 'GET_NAME_VIDEOGAME':
            console.log(action.payload)
            return {
                ...state,
                videogames: action.payload
            }

        case 'GET_DETAIL':
            return{
                ...state,
                detail: action.payload
            }
        case 'CLEAR_VIDEOGAME':
            return{
                ...state,
                detail: action.payload
            }
            
        case 'FILTER_BY_STATUS':
                const allVideogames = state.videogames;
                const statusFiltered = action.payload === 'All' ? allVideogames: allVideogames.filter(el => el.status === action.payload)
                return{
                    ...state,
                    videogames: statusFiltered
                }
                
        case 'FILTER_CREATED':
                    const allVideogames2 = state.allVideogames;
                    // console.log("SOY CONSOLE LOG", allVideogames2);
                    const createdFilter = action.payload === 'created' ? allVideogames2.filter(el => el.createdInDb === true) : action.payload === 'api' ? allVideogames2.filter(el => el.hasOwnProperty("createdInDb") === false) : allVideogames2
                    return{
                        ...state,
                        videogames: createdFilter
                    }


        case 'FILTER_BY_GENRES':
                    const allVideogames3 = state.allVideogames;
                    let filterGenres = []
                    allVideogames3.forEach(vg => {
                        if(vg.createdInDb === true) {
                            vg.genres.forEach(genre => genre.name === action.payload ? filterGenres.push(vg) : null)
                        } else if(action.payload === 'genres') {
                            return allVideogames3
                        } else {
                            vg.genres.forEach(genre => genre === action.payload ? filterGenres.push(vg) : null)
                        } 
                    })
                    return {
                        ...state,
                        videogames: filterGenres
                    }


        case 'ORDER_BY_RATING':
            let sortedArrayRating = action.payload === 'maxmin' ?
             state.videogames.map(e => e).sort(function(a, b){
                if(a.rating > b.rating){
                    return 1;
                } 
                if(b.rating > a.rating){
                    return -1;
                }
                return 0
            })
             : action.payload === 'minmax' ? 
            state.videogames.map(e => e).sort(function(a, b){
                if(a.rating > b.rating){
                    return -1;
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0
            })
            : state.allVideogames
            return {
                    ...state,
                    videogames: sortedArrayRating
                }

        case 'SET_CURRENT_PAGE':
                return {
                    ...state,
                    actualPage: action.payload
                }

        case 'ORDER_BY_NAME':
                        let sortedArray = action.payload === 'asc' ? state.videogames.sort(function(a, b){
                if(a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0

            }) :
            state.videogames.sort(function(a, b){
                if(a.name > b.name) {
                    return -1;
                }
                if (b.name > a.name) {
                    return 1
                }
                return 0

            })
            return {
                ...state,
                videogames: sortedArray
            }
            default:
                return state;
    }
}


export default rootReducer;