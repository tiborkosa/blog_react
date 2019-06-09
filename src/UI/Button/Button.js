import React from 'react';

export default props => (
	<div className="buttonWrapper">
		<button 
			onClick={props.clicked}
			type={props.type || 'button'}
			disabled={props.disabled || false}
			className={props.styleClass}>
			{props.children}
		</button>
	</div>);
