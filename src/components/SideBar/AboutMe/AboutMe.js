import React from 'react';
import {Link} from 'react-router-dom';

import Button from '../../../UI/Button/Button';
import Image from '../../../UI/Image/Image';

const aboutMe = (props) => {
	let img = null;
	let desc = "Could not load about";

	if(props.about){
		img=<Image name={props.about.image} />
		if(props.about.about.length > 100){
			desc=props.about.about.substring(0, 100)+ " ...";
		} else{
			desc=props.about.about;
		}
	}
	return(
		<aside className="AboutMe">
			<div className="ImgWrapper">
				{img}
			</div>
			<p>{desc}</p>
			<Link to='about' >
				<Button>Read More</Button>
			</Link>
		</aside>
	)
}

export default aboutMe;
