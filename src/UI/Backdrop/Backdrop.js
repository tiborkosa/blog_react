import React from 'react';

const backdrop = props => (<div 
							className="backdrop"
							onClick = {e => e.stopPropagation()}> 
							{props.children}
						</div>);

export default backdrop;
