import { ADD_MOVIES} from "../Actions";
import { ADD_TO_FAVOURITE } from "../Actions";
import { REMOVE_FROM_FAVOURITES } from "../Actions";

const initialMoviesState = {
    list : [],
    favourites:[]
}

export default function movies(state=initialMoviesState,action){

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
        default:
            return state
        
    }
    // if(action.type === ADD_MOVIES){
    //     //returns a new state
    //     return {
    //         //copy the previous state
    //         ...state,
    //         //modify only the list field of previous state
    //         list:action.movies
    //     }
    // }
    // return state;
}
