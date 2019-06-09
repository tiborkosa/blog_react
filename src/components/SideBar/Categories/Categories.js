import React from 'react';

const catgories = (props) => {
	let categories = (<p>No categories yet</p>);
	if(props.categories){
		categories = props.categories.map( 
			cat => (
				<li 
					onClick={() => props.clicked(cat)} 
					key={cat.name}>{cat.name}
				</li>
				)
			);
	}
	return (
		<aside className="Categories">
			<h1>Categories</h1>
			<ul>
				{categories}
			</ul>
		</aside>
	)
}

export default catgories;