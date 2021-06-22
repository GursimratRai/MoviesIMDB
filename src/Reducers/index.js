import { ADD_MOVIES } from "../Actions";

const initialMoviesState = {
    list : [],
    favourite:[]
}

export default function movies(state=initialMoviesState,action){
    if(action.type === ADD_MOVIES){
        //returns a new state
        return {
            //copy the previous state
            ...state,
            //modify only the list field of previous state
            list:action.movies
        }
    }
    return state;
}
