import React,{Component} from 'react';
import Search from './components/Search';
import Nav from './components/Nav';
import Photos from './components/Photos';
import './App.css';
import axios from 'axios';
import Load from './components/load.js';
import apiKey from './config';
import NotFound from './components/NotFound';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
export default class App extends Component {

 
  constructor() {
    super();
    this.state={
      photos: [],
      loading:true
    };
  } 

  performSearch = (query) =>{
    this.setState({ loading: true });
 axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&text=${query}&per_page=24&sort=relevance&content_type=1&format=json&nojsoncallback=1`)
    .then(response => {
      this.setState({
      photos: response.data.photos.photo,
      loading:false
    });
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });
  }
  
componentDidMount(){
  this.performSearch('dogs');
}


render() { 

  return (
    <div className="container">
      <Search onSearch={this.performSearch} load={this.state.loading} />
      <BrowserRouter>
    <div className="container">
    <Nav />
      
      <Switch>
        <Route exact path="/" render={ () => 
      (   
        (this.state.loading)
          ? <Load />
          : <Photos data={this.state.photos} />
          )
         
        } />
       
         <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
   
      
    </div>
  );
}

}