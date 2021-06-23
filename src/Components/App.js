import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {data} from '../data';
import {addMovies, setShowFavourites} from '../Actions'

class App extends React.Component{
  componentDidMount(){
    const{store} = this.props;
    store.subscribe(()=>{
      console.log('Updated');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
    console.log('store',this.props);
  }

  isMovieFavourite = (movie)=>{
    const {movies} = this.props.store.getState();
    const index = movies.favourites.indexOf(movie);
    if(index !== -1){
      //found the movie
      return true;
    }
    //movie in not in the favourites
    return false;
  }
  onChangeTab = (val) =>{
    this.props.store.dispatch(setShowFavourites(val))
  }
  render(){
    const {movies} =this.props.store.getState();
    const { list,favourites,showFavourites} = movies;
    const displayMovies = showFavourites?favourites:list;
    console.log('state in render',this.props.store.getState());
    
    return (
      <div className="App">
        <Navbar />
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
                  dispatch={this.props.store.dispatch}
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

export default App;
