import React from 'react';
import { IMG_URL } from '../../Common';

const Input = props => {

    let theImage = '';
    switch(props.imgFor){
        case 'icon':
            theImage = (
                <img src={IMG_URL+createImagePath(props.name, 100)} alt="Author"/>);
            break;
        default:
            theImage = (
                <picture>
                    <source 
                        media="(max-width: 600px)" 
                        srcSet={IMG_URL+createImagePath(props.name, 600)}
                        type= "image/webp" />
                    <img 
                        src={IMG_URL+createImagePath(props.name, 900)} 
                        type="image/webp"
                        alt='Blog' />
                </picture>)
            break;
    }
    return (
        <div className='ImgWrapper'>
            {theImage}
        </div>
    )
};

function createImagePath(name, size){
    if(!name || name === '') return '';
    const arr = name.split('.');
    const ext = arr.pop();
    const filename = arr.join('.');

    return `${filename}_${size}.${ext}.${ext}`;
}
export default Input;
