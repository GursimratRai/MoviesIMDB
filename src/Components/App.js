import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {data} from '../data';
import {addMovies, setShowFavourites} from '../Actions'
import {connect} from '../index';

class App extends React.Component{
  componentDidMount(){
    this.props.dispatch(addMovies(data));
  }

  isMovieFavourite = (movie)=>{
    const {movies} = this.props;
    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      //found the movie
      return true;
    }
    //movie in not in the favourites
    return false;
  }
  onChangeTab = (val) =>{
    this.props.dispatch(setShowFavourites(val))
  }
  render(){
    const {movies,search} = this.props;
    const { list,favourites,showFavourites} = movies;
    const displayMovies = showFavourites?favourites:list;
    console.log('state in render',this.props);

    
    return (
      <div className="App">
        <Navbar search={search}/>
        <div className="main">
          <div className="tabs">
            <div className={`tab ${showFavourites?'':'active-tabs'}`} onClick={() => this.onChangeTab(false)}>Movies</div>
            <div className={`tab ${showFavourites?'active-tabs':''}`} onClick={() => this.onChangeTab(true)}>Favourites</div>
          </div>
          <div className="List">
            {displayMovies.map((movie,index)=>(
              <MovieCard 
                  movie={movie} 
                  key={`movies-${index}`} 
                  dispatch={this.props.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length===0?<div className="no-movies">No Movies to display</div>:null}
        </div>
      </div>
    );
    
  }
}

//As we are using componentDidMount ,ComponentDidUpdate etc 
//we create a wrapper over app to use StoreContext's store as props .
//Otherwise we simply use StoreContext.Consumer in render function of App.
//StoreContext is use only in the render function .
// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store}/>}
//       </StoreContext.Consumer>
//     )
//   }
// }

//Used in connect  as argument.
//It defines the date we need from redux store.
//callback function
function mapStateToProps(state){
  return{
    movies:state.movies,
    search:state.movies
  }
}

//connect function will take two arguments i.e. function and component we want to pass the data as props .
//It will return a new component.
//It will Internally call callback function above and we get the whole state/store
//Then we can choose data we want from the state/store. 
const connectedAppComponent = connect(mapStateToProps)(App);

export default connectedAppComponent;
