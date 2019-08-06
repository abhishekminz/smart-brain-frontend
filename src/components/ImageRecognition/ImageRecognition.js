import React from 'react';
import './ImageRecognition.css';

const ImageRecognition = ({displayImage, boundingBox}) => {
    return(
        <div className='center ma'>
        <div className='absolute mt2'>
            <img id='inputImage' width='500px' height='auto' alt='' src={displayImage}></img>
            <div className='bounding-box' 
                 style={{left: boundingBox.leftCol, right: boundingBox.rightCol, top: boundingBox.topRow, bottom: boundingBox.bottomRow}}>
            </div>
        </div>
        </div>
    );
}

export default ImageRecognition;