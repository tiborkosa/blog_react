import React from 'react';

const tags = (props) => { 
	let taggs = (<p>No tags yet</p>);
	if(props.taggs){
		taggs = props.taggs.map( 
			tag => (
				<span 
					onClick={() => (props.clicked(tag))} 
					key={tag.name}>#{tag.name}({tag.value})
				</span>
				) 
			)
	}

	return(
		<aside className="Tags">
			<h1>Tags</h1>
			<div>
				{taggs}
			</div>
		</aside>
	)
};

export default tags;