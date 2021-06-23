import { ADD_MOVIES, SET_SHOW_FAVOURITES} from "../Actions";
import { ADD_TO_FAVOURITE } from "../Actions";
import { REMOVE_FROM_FAVOURITES } from "../Actions";

const initialMoviesState = {
    list : [],
    favourites:[],
    showFavourites:false
}

const intialSearchState = {
    result:{}
}

const initialRootState = {
    movies:initialMoviesState,
    search:intialSearchState
}

export function movies(state=initialMoviesState,action){

    switch(action.type){
        case ADD_MOVIES:
            return {
                ...state,
                list:action.movies
            }
        
        case ADD_TO_FAVOURITE:
            return {
                ...state,
                //add new movie to favourite with all the previous favourite movies intact.
                favourites:[action.movie,...state.favourites]
            }
        
        case REMOVE_FROM_FAVOURITES:
            const filteredArray = state.favourites.filter(
                movie => movie.Title!==action.movie.Title
            );
            
            return{
                ...state,
                favourites:filteredArray
            };       
        case SET_SHOW_FAVOURITES:
            return{
                ...state,
                showFavourites:action.val
            }
        default:
            return state
        
    }
}

export function search (state=intialSearchState,action){
    return state;
}

export default function rootReducer(state=initialRootState,action){
    return {
        movies:movies(state.movies,action),
        search:search(state.search,action)
    }
}