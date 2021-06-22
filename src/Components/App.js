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
  render(){
    const movies = this.props.store.getState();
    console.log('render');
    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>
          <div className="List">
            {movies.map((movie,index)=>(
              <MovieCard movie={movie} key={`movies-${index}`}/>
            ))}
          </div>
        </div>
      </div>
    );
    
  }
}

export default App;
