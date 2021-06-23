import { combineReducers } from "redux";
import { 
    ADD_MOVIES, 
    ADD_TO_FAVOURITE,
    SET_SHOW_FAVOURITES,
    REMOVE_FROM_FAVOURITES
} from "../Actions";

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
     console.log('MOVIES REDUCER');
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
    console.log('SEARCH REDUCER');
    return state;
}

// export default function rootReducer(state=initialRootState,action){
//     return {
//         movies:movies(state.movies,action),
//         search:search(state.search,action)
//     }
// }

//use combineReducers method from redux
//Same as rootReducer internally.
export default combineReducers({
    //movies reducer
    movies,
    //search reducer
    search
});