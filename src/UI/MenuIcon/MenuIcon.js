import React from 'react';

const menuIcon = (props) => (
	<div className={['nav-icon', props.active ? 'active' : ''].join(' ')}>
		<span></span>
		<span></span>
		<span></span>
		<span></span>
	</div>
	);
export default menuIcon;