import React from 'react';
import Image from '../../UI/Image/Image';

const Author = props => (
    <div className="author">
        <Image name={props.image} imgFor='icon' />
        <span>BY {props.firstname} {props.lastname}</span>
    </div>
);

export default Author;
