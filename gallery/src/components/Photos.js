import React from 'react';
import Photo from './Photo';
import NoPhotos from './NoPhotos'

const Photos = props => { 

    const results = props.data;
    let imgss;
  
    if (results.length>0){
        imgss = results.map(
        img =>
        < Photo url={`http://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}.jpg`}  key={img.id} />
      );
    }
    else {
      imgss = <NoPhotos/>
    }
  
    return(
      <ul >
        {imgss}
      </ul> 
    );
  }
    
export default Photos;
