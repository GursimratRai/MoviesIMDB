import React from 'react';
import Navbar from './Navbar';
import MovieCard from './MovieCard';
import {data} from '../data';
import {addMovies} from '../Actions'

class App extends React.Component{
  componentDidMount(){
    const{store} = this.props;
    store.subscribe(()=>{
      console.log('Updated');
      this.forceUpdate();
    })
    store.dispatch(addMovies(data));
    console.log('movies',this.props.store.getState());
  }

  isMovieFavourite = (movie)=>{
    const {favourites} = this.props.store.getState();
    const index = favourites.indexOf(movie);
    if(index !== -1){
      //found the movie
      return true;
    }
    //movie in not in the favourites
    return false;
  }
  render(){
    const { list } = this.props.store.getState();
    console.log('state in render',this.props.store.getState());
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="List">
            {list.map((movie,index)=>(
              <MovieCard 
                  movie={movie} 
                  key={`movies-${index}`} 
                  dispatch={this.props.store.dispatch}
                  isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
        </div>
      </div>
    );
    
  }
}

export default App;
