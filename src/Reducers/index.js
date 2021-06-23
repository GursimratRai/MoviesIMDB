import { combineReducers } from "redux";
import { 
    ADD_MOVIES, 
    ADD_TO_FAVOURITE,
    SET_SHOW_FAVOURITES,
    REMOVE_FROM_FAVOURITES,
    ADD_SEARCH_RESULT,
    ADD_MOVIE_TO_LIST
} from "../Actions";

const initialMoviesState = {
    list : [],
    favourites:[],
    showFavourites:false
}

const intialSearchState = {
    result:{},
    showSearchResults : false
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
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                list : [action.movie,...state.list]
            };
        default:
            return state
        
    }
}

export function search (state=intialSearchState,action){
    switch(action.type){
        case ADD_SEARCH_RESULT:
            return {
                ...state,
                result:action.movie,
                showSearchResults:true
            }
        case ADD_MOVIE_TO_LIST:
            return {
                ...state,
                showSearchResults:false
            }
        default:
            return state;
    }
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