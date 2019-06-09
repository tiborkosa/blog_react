import React from 'react';
import {Link} from 'react-router-dom';

const logo = () => (
	<Link to={'/'} onClick={ e => e.stopPropagation()}>
		<div className="Logo">
			<img src={require('../../../assets/logo.png')} alt="T-blog" />
		</div>
	</Link>
)

export default logo;
