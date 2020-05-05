import React,{Component} from 'react';
import Search from './components/Search';
import Nav from './components/Nav';
import Photos from './components/Photos';
import './App.css';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


export default class App extends Component {

 
  constructor() {
    super();
    this.state={
      imgs: [],
      loading:true
    };
  } 

  
componentDidMount(){
  this.performSearch();
}
performSearch = (query='cats') =>{

 axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=de2097d720c1ce50a4c24639c697fbc9&tags=cats&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    this.setState({
    imgs: response.data.photos.photo,
    loading:false
  });

  })
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });

}
render() { 
  console.log(this.state.imgs);
  return (
    <div className="container">
      <Search onSearch={this.performSearch} />
      <Nav />
      <Photos data={this.state.imgs} />
    </div>
  );
}

}